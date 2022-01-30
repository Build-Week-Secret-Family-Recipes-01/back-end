const db = require("../data/db-config");

async function findAllUsers() {
  const users = await db("users").select(
    "user_id",
    "username",
    "password",
    "permissions"
  );
  return users;
}

function findBy(filter) {
  return db("users")
    .select("user_id", "username", "password", "permissions")
    .where(filter);
}

async function addUser(user) {
  const [createdUser] = await db("users").insert(user, [
    "user_id",
    "username",
    "password",
    "permissions"
  ]);
  return createdUser;
}

module.exports = {
  findAllUsers,
  findBy,
  addUser
};
