exports.seed = async function (knex) {
  await knex("recipe_categories").insert([
    {
      recipe_id: 1,
      category_id: 11,
    },
    {
      recipe_id: 2,
      category_id: 3,
    },
    {
      recipe_id: 3,
      category_id: 8,
    },
    {
      recipe_id: 1,
      category_id: 2,
    },
    {
      recipe_id: 3,
      category_id: 12,
    },
    {
      recipe_id: 4,
      category_id: 11,
    },
    {
      recipe_id: 4,
      category_id: 8,
    },
    {
      recipe_id: 5,
      category_id: 2,
    },
    {
      recipe_id: 5,
      category_id: 11,
    },
  ]);
};
