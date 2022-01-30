exports.seed = async function (knex) {
  await knex("categories").insert([
    {
      category_name: "Breakfast"
    },
    {
      category_name: "Italian"
    },
    {
      category_name: "Mexican"
    },
    {
      category_name: "Mediterranean"
    },
    {
      category_name: "Indian"
    },
    {
      category_name: "Chinese"
    },
    {
      category_name: "Korean"
    },
    {
      category_name: "African"
    },
    {
      category_name: "Healthy"
    },
    {
      category_name: "Dessert"
    },
    {
      category_name: "Sandwiches"
    },
    {
      category_name: "Vegetarian"
    },
  ]);
};
