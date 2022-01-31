exports.seed = async function (knex) {
  await knex("steps_ingredients").insert([
    {
      ingredient_id: 1,
      step_id: 1,
      quantity: "2 slices"
    },
    {
      ingredient_id: 2,
      step_id: 2,
      quantity: "1 tbsp"
    },
    {
      ingredient_id: 3,
      step_id: 3,
      quantity: "1 tbsp"
    },
    {
      ingredient_id: 4,
      step_id: 5,
      quantity: "5 cups"
    },
    {
      ingredient_id: 5,
      step_id: 5,
      quantity: "3 servings"
    },
    {
      ingredient_id: 6,
      step_id: 6,
      quantity: "3 cups"
    },
    {
      ingredient_id: 7,
      step_id: 7,
      quantity: "11"
    },
    {
      ingredient_id: 8,
      step_id: 9,
      quantity: "to taste"
    },
    {
      ingredient_id: 9,
      step_id: 10,
      quantity: "3 scoops"
    },
    {
      ingredient_id: 10,
      step_id: 10,
      quantity: "1 cup"
    },
    {
      ingredient_id: 11,
      step_id: 10,
      quantity: "to taste"
    },
    {
      ingredient_id: 12,
      step_id: 12,
      quantity: "2"
    },
    {
      ingredient_id: 13,
      step_id: 11
    },
  ]);
};
