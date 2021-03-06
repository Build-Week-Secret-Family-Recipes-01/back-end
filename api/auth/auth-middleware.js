const dbConfig = require("../data/db-config");
const { JWT_SECRET } = require("../secrets");
const jwt = require("jsonwebtoken");

const loggedInCheck = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    next({ status: 401, message: "Token required" });
  } else {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        next({ status: 401, message: "Token invalid" });
      } else {
        req.decodedJwt = decoded;
        next();
      }
    });
  }
};

const permissionsCheck = (permissions) => (req, res, next) => {
  if (req.decodedJwt.permissions === permissions) {
    next();
  } else {
    next({ status: 403, message: "Invalid permissions" });
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
  if (req.decodedJwt.permissions === "admin") {
    next();
  } else if (req.decodedJwt.subject === +req.params.user_id) {
    next();
  } else {
    next({ status: 403, message: "You do not own or have permission to view this data." });
  }
}

module.exports = {
  loggedInCheck,
  permissionsCheck,
  checkUsernameUnique,
  checkUsernameExists,
  validatePermissionsName,
  validateUserId,
  privateRecipeCheck
};
