exports.seed = async function (knex) {
  await knex("categories").insert([
    {
      category_name: "Breakfast"
    },
    {
      category_name: "Lunch"
    },
    {
      category_name: "Dinner"
    },
    {
      category_name: "Appetizer"
    },
    {
      category_name: "Salad"
    },
    {
      category_name: "Side-Dish"
    },
    {
      category_name: "Baked-Goods"
    },
    {
      category_name: "Dessert"
    },
    {
      category_name: "Snack"
    },
    {
      category_name: "Soup"
    },
    {
      category_name: "Vegetarian"
    },
    {
      category_name: "Drinks"
    },
  ]);
};
