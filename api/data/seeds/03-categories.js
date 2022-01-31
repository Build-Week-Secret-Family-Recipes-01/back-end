exports.seed = async function (knex) {
  await knex("categories").insert([
    {
      category_name: "breakfast"
    },
    {
      category_name: "italian"
    },
    {
      category_name: "mexican"
    },
    {
      category_name: "mediterranean"
    },
    {
      category_name: "indian"
    },
    {
      category_name: "chinese"
    },
    {
      category_name: "korean"
    },
    {
      category_name: "african"
    },
    {
      category_name: "healthy"
    },
    {
      category_name: "dessert"
    },
    {
      category_name: "sandwiches"
    },
    {
      category_name: "vegetarian"
    },
  ]);
};
