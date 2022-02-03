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

router.post("/register", validatePermissionsName, checkUsernameUnique, async (req, res, next) => {
    try {
      const user = req.body;
      const hash = bcrypt.hashSync(user.password, BCRYPT_ROUNDS);
      user.password = hash;
      const newUser = await User.addUser(user);
      res.status(201).json(newUser);
    } catch (err) {
      next(err);
    }
  }
);

router.post("/login", checkUsernameExists, async (req, res, next) => {
    const { username, password } = req.body;

    User.findBy({ username })
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = makeToken(user);
        res.status(200).json({ message: `${username} is back!`, token, user });
      } else {
        next({ status: 401, message: "Invalid credentials" });
      }
    })
    .catch(next);



  //   const [user] = await User.findBy({ username });
  //   if (user && bcrypt.compareSync(password, user.password)) {
  //     req.session.user = user;
  //     res.status(200).json(user);
  //   } else {
  //     next({ status: 401, message: "Invalid credentials" });
  //   }
  // } catch (err) {
  //   next(err);
  // }
});

// router.get("/logout", (req, res, next) => {
//   if (req.session.user) {
//     req.session.destroy((err) => {
//       if (err) {
//         next(err);
//       } else {
//         res.json({ message: "Successfully logged out" });
//       }
//     });
//   } else {
//     res.json({ message: "Nobody was logged in" });
//   }
// });

module.exports = router;
