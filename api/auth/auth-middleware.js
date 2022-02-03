const dbConfig = require("../data/db-config");
const { JWT_SECRET } = require("../secrets");
const jwt = require("jsonwebtoken");

// const loggedInCheck = (req, res, next) => {
//   next();
//   // console.log("CHECKING: ", req.headers);
//   // const token = req.headers.authorization;
//   // if (!token) {
//   //   next({ status: 401, message: "Token required" });
//   // } else {
//   //   jwt.verify(token, JWT_SECRET, (err, decoded) => {
//   //     if (err) {
//   //       next({ status: 401, message: "Token invalid" });
//   //     } else {
//   //       req.decodedJwt = decoded;
//   //       next();
//   //     }
//   //   });
//   // }
  
//   // // try {
//   // //   if (req.session.user) {
//   // //     next();
//   // //   } else {
//   // //     next({ status: 401, message: "You must be logged in to use this feature." });
//   // //   }
//   // // } catch (err) {
//   // //   next(err);
//   // // }
// };

const permissionsCheck = (permissions) => (req, res, next) => {
  if (req.session.user.permissions === permissions) {
    next();
  } else {
    next({ status: 403, message: "You are not permitted to view this data" });
  }
};

const checkUsernameUnique = async (req, res, next) => {
  try {
    const usernameTaken = await dbConfig("users")
      .where("username", req.body.username)
      .first();
    if (usernameTaken) {
      if (usernameTaken.user_id.toString() === req.params.user_id) {
        next();
      } else {
        next({ status: 401, message: "Username taken" });
      }
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

const checkUsernameExists = async (req, res, next) => {
  try {
    const usernameExists = await dbConfig("users")
      .where("username", req.body.username)
      .first();

    if (usernameExists) {
      next();
    } else {
      next({ status: 401, message: "Invalid credentials" });
    }
  } catch (err) {
    next(err);
  }
};

const validatePermissionsName = (req, res, next) => {
  if (req.body.permissions) {
    req.body.permissions = req.body.permissions.toLowerCase().trim();
    const permissions = req.body.permissions;

    if (permissions.length === 0) {
      req.body.permissions = "user";
      next();
    } else if (permissions === "admin" || permissions === "user") {
      next();
    } else {
      next({ status: 401, message: "Invalid permissions status" });
    }
  } else {
    req.body.permissions = "user";
    next();
  }
};

const validateUserId = async (req, res, next) => {
  try {
    const possibleId = await dbConfig("users")
      .where("user_id", req.params.user_id)
      .first();

    if (possibleId) {
      next();
    } else {
      next({ status: 404, message: "User not found" });
    }
  } catch (err) {
    next(err);
  }
};

const privateRecipeCheck = async (req, res, next) => {
  try {
    if (req.session.user.permissions === "admin") {
      next();
    } else if (req.session.user.user_id === +req.params.user_id) {
      next();
    } else {
      res.status(403).json({ message: "You do not own or have permission to view this data." });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  // loggedInCheck,
  permissionsCheck,
  checkUsernameUnique,
  checkUsernameExists,
  validatePermissionsName,
  validateUserId,
  privateRecipeCheck
};
