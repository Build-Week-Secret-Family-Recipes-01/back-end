const db = require("../data/db-config");

async function findAllUsers() {
  const users = await db("users")
    .select("user_id", "username", "password", "permissions")
    .orderBy("user_id");
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
    "permissions",
  ]);
  return createdUser;
}

async function updateUser(user_id, updates) {
  const [updatedUser] = await db("users")
    .where({ user_id })
    .update(updates, ["user_id", "username", "password", "permissions"]);
  return updatedUser;
}

async function deleteUser(user_id) {
  return db('users').where({ user_id }).del();
}

module.exports = {
  findAllUsers,
  findBy,
  addUser,
  updateUser,
  deleteUser
};
