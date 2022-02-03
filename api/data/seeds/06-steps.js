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
    {
      recipe_id: 5,
      step_number: 1,
      step_text: "Spread beans over warmed tortilla",
    },
    {
      recipe_id: 5,
      step_number: 2,
      step_text: "Sprinkle cheese over beans and roll tortilla over on itself to create a burrito",
    },
    {
      recipe_id: 5,
      step_number: 3,
      step_text: "Heat the burrito on the stove or microwave until cheese is melted",
    },
    {
      recipe_id: 5,
      step_number: 4,
      step_text: "Serve with salsa",
    },
    {
      recipe_id: 4,
      step_number: 1,
      step_text: "Take one graham cracker, put chocolate on top of it, and set it near fire so that chocolate will warm and melt slightly",
    },
    {
      recipe_id: 4,
      step_number: 2,
      step_text: "Roast marshmallow over open fire until desired doneness",
    },
    {
      recipe_id: 4,
      step_number: 3,
      step_text: "place marshmallow on top of chocolate covered graham cracker, then take another cracker and press on top of the mallow to create the s'more",
    },
  ]);
};
