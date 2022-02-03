exports.seed = async function (knex) {
  await knex("ingredients").insert([
    {
      ingredient_name: "whole wheat bread",
      quantity: "2 slices",
      recipe_id: 1
    },
    {
      ingredient_name: "peanut butter",
      quantity: "1 tbsp",
      recipe_id: 1
    },
    {
      ingredient_name: "grape jelly",
      quantity: "1 tbsp",
      recipe_id: 1
    },
    {
      ingredient_name: "water",
      quantity: "5 cups",
      recipe_id: 2
    },
    {
      ingredient_name: "spaghetti pasta",
      quantity: "3 servings",
      recipe_id: 2
    },
    {
      ingredient_name: "marinara sauce",
      quantity: "3 cups",
      recipe_id: 2
    },
    {
      ingredient_name: "meatballs",
      quantity: "9",
      recipe_id: 2
    },
    {
      ingredient_name: "parmesan cheese",
      quantity: "to taste",
      recipe_id: 2
    },
    {
      ingredient_name: "vanilla ice cream",
      quantity: "3 scoops",
      recipe_id: 3
    },
    {
      ingredient_name: "whole milk",
      quantity: "1 cup",
      recipe_id: 3
    },
    {
      ingredient_name: "chocolate syrup",
      quantity: "to taste",
      recipe_id: 3
    },
    {
      ingredient_name: "maraschino cherries",
      quantity: "2",
      recipe_id: 3
    },
    {
      ingredient_name: "whipped cream",
      quantity: null,
      recipe_id: 3
    },
    {
      ingredient_name: "chocolate",
      quantity: "2 bars",
      recipe_id: 4
    },
    {
      ingredient_name: "marshmallow",
      quantity: "8 mallows (or more, I'm not judging)",
      recipe_id: 4
    },
    {
      ingredient_name: "graham crackers",
      quantity: "4",
      recipe_id: 4
    },
    {
      ingredient_name: "flour tortilla",
      quantity: "1",
      recipe_id: 5
    },
    {
      ingredient_name: "refried beans",
      quantity: "2 tbsp",
      recipe_id: 5
    },
    {
      ingredient_name: "shredded cheese",
      quantity: "to taste",
      recipe_id: 5
    },
    {
      ingredient_name: "salsa",
      quantity: null,
      recipe_id: 5
    },
  ]);
};
