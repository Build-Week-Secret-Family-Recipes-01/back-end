exports.seed = async function (knex) {
  await knex("ingredients").insert([
    {
      ingredient_name: "whole wheat bread"
    },
    {
      ingredient_name: "peanut butter"
    },
    {
      ingredient_name: "grape jelly"
    },
    {
      ingredient_name: "water"
    },
    {
      ingredient_name: "spaghetti pasta"
    },
    {
      ingredient_name: "marinara sauce"
    },
    {
      ingredient_name: "meatballs"
    },
    {
      ingredient_name: "parmesan cheese"
    },
    {
      ingredient_name: "vanilla ice cream"
    },
    {
      ingredient_name: "whole milk"
    },
    {
      ingredient_name: "chocolate syrup"
    },
    {
      ingredient_name: "maraschino cherries"
    },
    {
      ingredient_name: "whipped cream"
    },
  ]);
};
