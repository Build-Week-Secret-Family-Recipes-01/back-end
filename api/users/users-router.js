const router = require("express").Router();
const Users = require("./users-model.js");
const { permissionsCheck } = require("../auth/auth-middleware.js");

router.get("/", permissionsCheck("admin"), (req, res, next) => {
  Users.findAllUsers()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(next);
});

router.get("/:user_id", (req, res, next) => {
  const user_id = req.params.user_id;
  Users.findBy({ user_id })
    .then((user) => {
      res.json(user);
    })
    .catch(next);
});

module.exports = router;
