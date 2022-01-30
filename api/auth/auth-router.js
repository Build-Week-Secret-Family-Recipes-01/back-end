const router = require("express").Router();
const { BCRYPT_ROUNDS } = require("../secrets");
const bcrypt = require("bcryptjs");
const User = require("../users/users-model");
const makeToken = require("./auth-token-builder");
const {
  checkUsernameExists,
  validatePermissionsName,
  checkUsernameUnique,
} = require("./auth-middleware");

router.post(
  "/register",
  validatePermissionsName,
  checkUsernameUnique,
  (req, res, next) => {
    let user = req.body;

    const hash = bcrypt.hashSync(user.password, BCRYPT_ROUNDS);
    user.password = hash;

    User.addUser(user)
      .then((createdUser) => {
        res.status(201).json(createdUser);
      })
      .catch(next);
  }
);

router.post("/login", checkUsernameExists, (req, res, next) => {
  let { username, password } = req.body;

  User.findBy({ username })
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = makeToken(user);
        res.status(200).json({ message: `Welcome back, ${username}`, token });
      } else {
        next({ status: 401, message: "Invalid credentials" });
      }
    })
    .catch(next);
});

module.exports = router;
