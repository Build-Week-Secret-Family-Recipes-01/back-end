exports.seed = async function (knex) {
  await knex("users").insert([
    {
      username: "admin",
      password: "$2a$08$dLCwL5TYd7.DzLRL6b8hUOM1OQ5BRTGx0zDXrXeKzJ7i26jPVgFj2", // plain text password is test
      permissions: "admin"
    },
    {
      username: "user1",
      password: "$2a$08$dLCwL5TYd7.DzLRL6b8hUOM1OQ5BRTGx0zDXrXeKzJ7i26jPVgFj2", // plain text password is test
      permissions: "user"
    },
    {
      username: "user2",
      password: "$2a$08$dLCwL5TYd7.DzLRL6b8hUOM1OQ5BRTGx0zDXrXeKzJ7i26jPVgFj2", // plain text password is test
      permissions: "user"
    },
  ]);
};
