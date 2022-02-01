const db = require("../data/db-config");

async function getAllRecipes() {
  const recipes = await db("recipes");
  return recipes;
}

async function addRecipe(recipe) {
  const [id] = await db("recipes").insert(recipe, [
    "recipe_id"
  ]);
  // you need a transaction > will fill in all tables - WRAP the whole thing into the transaction syntax

  console.log(id.recipe_id);
  return getRecipeById(id.recipe_id);
}

function buildRecipe(rawData) {
  let recipe = {
    recipe_id: rawData[0].recipe_id,
    user_id: rawData[0].user_id,
    title: rawData[0].title,
    source: rawData[0].source,
    image: rawData[0].image,
    categories: [],
    steps: [],
  };

  //update categories for recipe
  rawData.forEach(row => {
    if(!recipe.categories.includes(row.category_name))
    recipe.categories.push(row.category_name);
  })

  // cutting repeated steps off of RawData (caused by categories column)
  let useData = [];
  if(recipe.categories.length > 1) {
    let category = recipe.categories[0];
    for (let i = 0; i < rawData.length; i++){
      if (rawData[i].category_name === category) {
        useData.push(rawData[i])
      }
    }
  } else {
    useData = rawData;
  }
  console.log(useData)

  // push steps to recipe
  for (let i = 0; i < useData.length; i++) {
    let pushStep = () => {
      let step = {
        step_number: useData[i].step_number,
        step_text: useData[i].step_text,
        ingredients: [
          {
            Quantity: useData[i].quantity,
            Ingredient: useData[i].ingredient_name,
          },
        ],
      };
      recipe.steps.push(step);
    };
    // push ingredients to each step
    if (i > 0) {
      if (useData[i].step_number === useData[i - 1].step_number) {
        let x = recipe.steps.length;
        recipe.steps[x - 1].ingredients.push({
          Quantity: useData[i].quantity,
          Ingredient: useData[i].ingredient_name,
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

async function getRecipe(filter) {
  const rawData = await db("recipes as r")
    .join("steps as s", "s.recipe_id", "r.recipe_id")
    .join("recipe_categories as rcat", "rcat.recipe_id", "r.recipe_id")
    .join("categories as cat", "cat.category_id", "rcat.category_id")
    .leftJoin("steps_ingredients as si", "si.step_id", "s.step_id")
    .leftJoin("ingredients as i", "si.ingredient_id", "i.ingredient_id")
    .select( "r.recipe_id", "r.title", "r.source", "r.image", "r.user_id", "cat.category_name", "s.step_number", "s.step_text", "si.quantity", "i.ingredient_name" )
    .orderBy("s.step_number")
    .where(filter);

  const processed = buildRecipe(rawData);
  return processed;
}

async function getRecipeById(recipe_id) {
  const rawData = await db("recipes as r")
    .leftJoin("steps as s", "s.recipe_id", "r.recipe_id")
    .leftJoin("recipe_categories as rcat", "rcat.recipe_id", "r.recipe_id")
    .leftJoin("categories as cat", "cat.category_id", "rcat.category_id")
    .leftJoin("steps_ingredients as si", "si.step_id", "s.step_id")
    .leftJoin("ingredients as i", "si.ingredient_id", "i.ingredient_id")
    .select( "r.recipe_id", "r.title", "r.source", "r.image", "r.user_id", "cat.category_name", "s.step_number", "s.step_text", "si.quantity", "i.ingredient_name" )
    .orderBy("s.step_number")
    .where("r.recipe_id", recipe_id);

  const processed = buildRecipe(rawData);
  return processed;
}

// search for recipes by Category
async function getRecipesByCategory(category_name) {
  return await db("recipes as r")
  .join("recipe_categories as rcat", "rcat.recipe_id", "r.recipe_id")
  .join("categories as cat", "cat.category_id", "rcat.category_id")
  .where("cat.category_name", category_name)
}

module.exports = { 
  getAllRecipes, 
  getRecipe, 
  getRecipeById, 
  getRecipesByCategory, 
  addRecipe 
};



// will probs delete
async function getIngredients(step_id) {
  const ingredients = await db("ingredients as i")
    .join("steps_ingredients as si", "i.ingredient_id", "si.ingredient_id")
    .select("i.ingredient_id", "i.ingredient_name", "si.quantity")
    .where("si.step_id", step_id);
  return ingredients;
}

// will probs delete
async function getSteps(recipe_id) {
  const steps = await db("steps")
    .where("recipe_id", recipe_id)
    .orderBy("step_number");
  return steps;
}



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
// left join ingredients as i
// 	on si.ingredient_id = i.ingredient_id
// where r.recipe_id = 1;
