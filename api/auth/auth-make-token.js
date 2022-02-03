const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../secrets");

function makeToken(user) {
  const payload = {
    subject: user.user_id,
    username: user.username,
    role_name: user.role_name,
    permissions: user.permissions
  };
  const options = {
    expiresIn: "1d",
  };
  const token = jwt.sign(payload, JWT_SECRET, options);
  return token;
}

module.exports = makeToken;
