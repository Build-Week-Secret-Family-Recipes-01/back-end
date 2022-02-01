const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../users/users-model");
const {
  checkUsernameExists,
  validatePermissionsName,
  checkUsernameUnique,
} = require("./auth-middleware");

router.post(
  "/register",
  validatePermissionsName,
  checkUsernameUnique,
  async (req, res, next) => {
    try {
      const user = req.body;
      const hash = bcrypt.hashSync(user.password);
      user.password = hash;
      const newUser = await User.addUser(user);
      res.status(200).json(newUser);
    } catch (err) {
      next(err);
    }
  }
);

router.post("/login", checkUsernameExists, async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const [user] = await User.findBy({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.user = user;
      res.status(200).json({ message: `Welcome back, ${username}` });
    } else {
      next({ status: 401, message: "Invalid credentials" });
    }
  } catch (err) {
    next(err);
  }
});

router.get("/logout", (req, res, next) => {
  if (req.session.user) {
    req.session.destroy((err) => {
      if (err) {
        next(err);
      } else {
        res.json({ message: "Successfully logged out" });
      }
    });
  } else {
    res.json({ message: "Nobody was logged in" });
  }
});

module.exports = router;
