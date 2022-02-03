const router = require("express").Router();
const bcrypt = require("bcryptjs");
const makeToken = require("./auth-make-token");
const { BCRYPT_ROUNDS } = require('../secrets');
const User = require("../users/users-model");
const {
  checkUsernameExists,
  validatePermissionsName,
  checkUsernameUnique,
} = require("./auth-middleware");

router.post("/register", validatePermissionsName, checkUsernameUnique, (req, res, next) => {
    const user = req.body;

    const hash = bcrypt.hashSync(user.password, BCRYPT_ROUNDS);
    user.password = hash;

    User.addUser(user)
      .then(addedUser => {
        res.status(201).json(addedUser);
      })
      .catch(next);
  }
);

router.post("/login", checkUsernameExists, async (req, res, next) => {
    const { username, password } = req.body;

    User.findBy({ username })
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = makeToken(user);
        res.status(200).json({ message: `${username} logged in`, user, token });
      } else {
        next({ status: 401, message: "Invalid credentials" });
      }
    })
    .catch(next);
});

module.exports = router;
