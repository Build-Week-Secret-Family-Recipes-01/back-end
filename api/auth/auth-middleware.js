const dbConfig = require("../data/db-config");

const loggedInCheck = (req, res, next) => {
  try {
    if (req.session.user) {
      next();
    } else {
      next({ status: 401, message: "You shall not pass!" });
    }
  } catch (err) {
    next(err);
  }
};

const permissionsCheck = (permissions) => (req, res, next) => {
  if (req.decodedJwt.permissions === permissions) {
    next();
  } else {
    next({ status: 403, message: "You are not authorized to view this data" });
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
  try {
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
  } catch (err) {
    next(err);
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

module.exports = {
  loggedInCheck,
  permissionsCheck,
  checkUsernameUnique,
  checkUsernameExists,
  validatePermissionsName,
  validateUserId,
};
