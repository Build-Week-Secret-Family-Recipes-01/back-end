const router = require("express").Router();
const { BCRYPT_ROUNDS } = require("../secrets");
const bcrypt = require("bcryptjs");
const Users = require("./users-model.js");
const {
  loggedInCheck,
  permissionsCheck,
  validatePermissionsName,
  checkUsernameUnique,
  validateUserId,
} = require("../auth/auth-middleware.js");

router.get("/", loggedInCheck, permissionsCheck("admin"), (req, res, next) => {
  Users.findAllUsers()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(next);
});

router.get("/:user_id", validateUserId, (req, res, next) => {
  const user_id = req.params.user_id;
  Users.findBy({ user_id })
    .first()
    .then((user) => {
      res.json(user);
    })
    .catch(next);
});

router.put(
  "/:user_id",
  validateUserId,
  checkUsernameUnique,
  validatePermissionsName,
  (req, res, next) => {
    let user = req.body;

    const hash = bcrypt.hashSync(user.password, BCRYPT_ROUNDS);
    user.password = hash;

    Users.updateUser(req.params.user_id, user)
      .then((user) => {
        res.status(200).json(user);
      })
      .catch(next);
  }
);

module.exports = router;
