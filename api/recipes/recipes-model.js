const { raw } = require("express");
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
  const rawData = await db("recipes as r")
    .join("steps as s", "s.recipe_id", "r.recipe_id")
    .join("recipe_categories as rcat", "rcat.recipe_id", "r.recipe_id")
    .join("categories as cat", "cat.category_id", "rcat.category_id")
    .leftJoin("steps_ingredients as si", "si.step_id", "s.step_id")
    .leftJoin("ingredients as i", "si.ingredient_id", "i.ingredient_id")
    .select(
      "r.recipe_id",
      "r.title",
      "r.source",
      "r.image",
      "r.user_id",
      "cat.category_name",
      "s.step_number",
      "s.step_text",
      "si.quantity",
      "i.ingredient_name"
    )
    .orderBy("s.step_number")
    .where(filter);

  let recipe = {
    recipe_id: rawData[0].recipe_id,
    user_id: rawData[0].user_id,
    title: rawData[0].title,
    source: rawData[0].source,
    image: rawData[0].image,
    category_name: rawData[0].category_name,
    steps: [],
  };

  for (let i = 0; i < rawData.length; i++) {
    let pushStep = () => {
      let step = {
        step_number: rawData[i].step_number,
        step_text: rawData[i].step_text,
        ingredients: [
          {
            Quantity: rawData[i].quantity,
            Ingredient: rawData[i].ingredient_name,
          },
        ],
      };
      recipe.steps.push(step);
    };

    if (i > 0) {
      if (rawData[i].step_number === rawData[i - 1].step_number) {
        recipe.steps[i - 1].ingredients.push({
          Quantity: rawData[i].quantity,
          Ingredient: rawData[i].ingredient_name,
        });
      } else {
        pushStep();
      }
    } else {
      pushStep();
    }
  }

  return recipe;
}

module.exports = { getAllRecipes, getRecipe };

// SQL for the GetRecipe function:
// select
// 	r.recipe_id, r.title, r.source, r.image, r.user_id, cat.category_name, s.step_number, s.step_text, si.quantity, i.ingredient_name
// from recipes as r
// join steps as s
// 	on s.recipe_id = r.recipe_id
// join recipe_categories as rcat
// 	on rcat.recipe_id = r.recipe_id
// join categories as cat
// 	on cat.category_id = rcat.category_id
// left join steps_ingredients as si
// 	on si.step_id = s.step_id
// join ingredients as i
// 	on si.ingredient_id = i.ingredient_id
// where r.recipe_id = 1;
