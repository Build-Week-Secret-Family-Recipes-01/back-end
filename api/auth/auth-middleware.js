const dbConfig = require("../data/db-config");
const { JWT_SECRET } = require("../secrets");
const jwt = require("jsonwebtoken");

const restricted = (req, res, next) => {
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

const only = (role_name) => (req, res, next) => {
  if (req.decodedJwt.role_name === role_name) {
    next();
  } else {
    next({ status: 403, message: "This is not for you" });
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

const validateRoleName = (req, res, next) => {
  try {
    if (req.body.role_name) {
      req.body.role_name = req.body.role_name.toLowerCase().trim();
      const role_name = req.body.role_name;

      if (role_name === "admin") {
        next({ status: 422, message: "Role name can not be admin" });
      } else if (role_name.length > 32) {
        next({
          status: 422,
          message: "Role name can not be longer than 32 chars",
        });
      } else if (role_name.length === 0) {
        req.body.role_name = "student";
        next();
      } else if (role_name === "student" || role_name === "instructor") {
        next();
      } else {
        next();
      }
    } else {
      req.body.role_name = "student";
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  restricted,
  checkUsernameExists,
  validateRoleName,
  only,
};
