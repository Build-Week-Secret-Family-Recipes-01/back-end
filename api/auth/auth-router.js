const router = require("express").Router();
const { checkUsernameExists, validateRoleName } = require("./auth-middleware");
const { BCRYPT_ROUNDS } = require("../secrets"); // use this secret!
const bcrypt = require("bcryptjs");
const User = require("../users/users-model");
const makeToken = require("./auth-token-builder");

router.post("/register", validateRoleName, (req, res, next) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, BCRYPT_ROUNDS);
  user.password = hash;

  User.add(user)
    .then((createdUser) => {
      res.status(201).json(createdUser);
    })
    .catch(next);
});

router.post("/login", checkUsernameExists, (req, res, next) => {
  let { username, password } = req.body;

  User.findBy({ username })
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = makeToken(user);
        res.status(200).json({ message: `${username} is back!`, token });
      } else {
        next({ status: 401, message: "Invalid credentials" });
      }
    })
    .catch(next);
});

module.exports = router;
