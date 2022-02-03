exports.seed = async function (knex) {
  await knex("recipes").insert([
    {
      title: "PB&J Sandwich",
      source: "Grandma Jane",
      image:
        "https://www.gannett-cdn.com/media/2021/05/02/USATODAY/usatsports/imageForEntry14-XDZ.jpg",
      user_id: 1,
      description: "Just a simple sandwich - feel free to swap out the type of each ingredient (strawberry jelly on pumpernickel works great). Serves 1 person"
    },
    {
      title: "Spaghetti",
      source: "Google",
      image:
        "https://www.onceuponachef.com/images/2019/09/Spaghetti-and-Meatballs.jpg",
      user_id: 2,
      description: "Live out your 'Lady & the Tramp' fantasy with this classic Italian dish! I like Prego marinara with mine because I'm trash. Serves 2 people"
    },
    {
      title: "Chocolate Milkshake",
      user_id: 3,
      description: "If you don't know what a milkshake is, I consider that a character flaw. Straight to jail."
    },
    {
      title: "S'mores",
      source: "Campfire John",
      image:
        "https://hips.hearstapps.com/vidthumb/images/delish-smores-jello-shots-still002-1525312534.jpeg",
      user_id: 1,
      description: "My summer-camp experience was never complete without gorging myself to death on this classic treat. Keep the demons of life at bay with this delicious confection!"
    },
    {
      title: "Bean + Cheese Burrito",
      image:
        "https://images.eatthismuch.com/site_media/img/322441_alijohns_363efd18-41a6-4f03-ac15-67de3ee560a0.png",
      user_id: 2,
    },
  ]);
};
