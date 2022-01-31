const db = require("../data/db-config");

async function getAllRecipes() {
  const recipes = await db("recipes");
  return recipes;
}

module.exports = { getAllRecipes };
