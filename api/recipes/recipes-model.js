const db = require("../data/db-config");

async function getAllRecipes() {
  const recipes = await db("recipes");
  return recipes;
}

async function getIngredients(step_id) {
  const ingredients = await db("ingredients as i")
    .join("steps_ingredients as si", "i.ingredient_id", "si.ingredient_id")
    .select("i.ingredient_id", "i.ingredient_name", "si.quantity")
    .where("si.step_id", step_id);
  return ingredients;
}

async function getSteps(recipe_id) {
  const steps = await db("steps")
    .where("recipe_id", recipe_id)
    .orderBy("step_number");
  return steps;
}

async function getRecipe(filter) {
  const recipe = await db("recipes").where(filter).first();
  recipe.steps = await getSteps(recipe.recipe_id);
  recipe.steps.forEach(async step => {
    step.ingredients = await getIngredients(step.step_id);
  });
  return recipe;
}

module.exports = { getAllRecipes, getRecipe };
