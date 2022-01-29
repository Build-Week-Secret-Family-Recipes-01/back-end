exports.seed = async function (knex) {
  await knex("recipes").insert([
    {
      title: "PB&J Sandwich",
      source: "Grandma Jane",
      ingredients: [
        "2 slices whole wheat bread",
        "1 tbsp peanut butter",
        "1 tbsp grape jelly",
      ],
      instructions: [
        { step: 1, text: "toast your bread" },
        { step: 2, text: "spread peanut butter on one of the slices" },
        { step: 3, text: "spread jelly on the other slice of bread" },
        { step: 4, text: "put slices together to make a sandwich" },
      ],
      image:
        "https://www.gannett-cdn.com/media/2021/05/02/USATODAY/usatsports/imageForEntry14-XDZ.jpg",
      user_id: 1,
    },
    {
      title: "Spaghetti",
      source: "Google",
      ingredients: [
        "water",
        "spaghetti pasta",
        "Prego marinara sauce",
        "meatballs (optional)",
        "parmesan cheese",
      ],
      instructions: [
        {
          step: 1,
          text: "bring water to a boil and cook pasta for 20 minutes",
        },
        { step: 2, text: "heat your marinara sauce" },
        { step: 3, text: "if included, heat your meatballs" },
        { step: 4, text: "combine ingredients" },
        { step: 5, text: "season with parmesan to taste" },
      ],
      image:
        "https://www.onceuponachef.com/images/2019/09/Spaghetti-and-Meatballs.jpg",
      user_id: 2,
    },
    {
      title: "Chocolate Milkshake",
      ingredients: [
        "3 Scoops Vanilla Blue Bell Ice Cream",
        "1 cup Whole Milk",
        "1 tbsp Chocolate Syrup",
        "2 cherries (optional)",
        "2 tbsp Whipped Cream",
      ],
      instructions: [
        {
          step: 1,
          text: "Combine ice cream, milk and chocolate syrup in a bowl or glass - stir to combine",
        },
        { step: 2, text: "Top with whipped cream" },
        { step: 3, text: "garnish with cherries" },
      ],
      user_id: 3,
    },
  ]);
};
