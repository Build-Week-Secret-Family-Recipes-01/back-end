exports.seed = async function (knex) {
  await knex("steps").insert([
    {
      recipe_id: 1,
      step_number: 1,
      step_text: "toast your bread",
    },
    {
      recipe_id: 1,
      step_number: 2,
      step_text: "spread peanut butter on one of the slices",
    },
    {
      recipe_id: 1,
      step_number: 3,
      step_text: "spread jelly on the other slice of bread",
    },
    {
      recipe_id: 1,
      step_number: 4,
      step_text: "put slices together to make a sandwich",
    },
    {
      recipe_id: 2,
      step_number: 1,
      step_text: "bring water to a boil and cook pasta for 20 minutes",
    },
    {
      recipe_id: 2,
      step_number: 2,
      step_text: "heat your marinara sauce",
    },
    {
      recipe_id: 2,
      step_number: 3,
      step_text: "if included, heat your meatballs",
    },
    {
      recipe_id: 2,
      step_number: 4,
      step_text: "combine ingredients in a large bowl",
    },
    {
      recipe_id: 2,
      step_number: 5,
      step_text: "season with parmesan to taste",
    },
    {
      recipe_id: 3,
      step_number: 1,
      step_text:
        "Combine ice cream, milk and chocolate syrup in a bowl or glass - stir to combine",
    },
    {
      recipe_id: 3,
      step_number: 2,
      step_text: "Top with whipped cream",
    },
    {
      recipe_id: 3,
      step_number: 3,
      step_text: "garnish with cherries",
    },
  ]);
};
