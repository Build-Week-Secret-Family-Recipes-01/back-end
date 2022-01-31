exports.seed = async function (knex) {
  await knex("recipes").insert([
    {
      title: "PB&J Sandwich",
      source: "Grandma Jane",
      image:
        "https://www.gannett-cdn.com/media/2021/05/02/USATODAY/usatsports/imageForEntry14-XDZ.jpg",
      user_id: 1,
    },
    {
      title: "Spaghetti",
      source: "Google",
      image:
        "https://www.onceuponachef.com/images/2019/09/Spaghetti-and-Meatballs.jpg",
      user_id: 2,
    },
    {
      title: "Chocolate Milkshake",
      user_id: 3,
    },
  ]);
};
