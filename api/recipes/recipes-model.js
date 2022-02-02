const res = require("express/lib/response");
const db = require("../data/db-config");

async function getAllRecipes() {
  const recipes = await db("recipes");
  return recipes;
}

async function getMyRecipes(user_id) {
  const recipes = await db("recipes").where("user_id", user_id);
  return recipes;
}

// IN PROGRESS!!!!!!!
async function addRecipe(recipe) {
  let newRecipe_id;
  await db.transaction(async (trx) => {
    const addRecipe = {
      title: recipe.title,
      source: recipe.source,
      image: recipe.image,
      user_id: recipe.user_id,
    };
    let recipe_id;
    try {
      [{ recipe_id }] = await trx("recipes").insert(addRecipe, "recipe_id");
      newRecipe_id = recipe_id;
    } catch (err) {
      res.status(500).json(err);
    }

    recipe.categories.forEach(async (category) => {
      const category_name = category.trim().toLowerCase();

      let category_id;
      try {
        const [existing_Category_id] = await trx("categories").where("category_name", category_name);

        if (existing_Category_id) {
          category_id = existing_Category_id.category_id;

        } else {
          try {
            let [{ id }] = await trx("categories").insert(category_name, "category_id");
            category_id = id;

          } catch (err) {
            res.status(401).json(err);
          }
        }

        const recipe_category = {
          recipe_id: newRecipe_id,
          category_id: category_id,
        };

        try {
          await trx("recipe_categories").insert(recipe_category);

        } catch (err) {
          res.status(401).json(err);
        }
      } catch (err) {
        res.status(401).json(err);
      }
    });

    let stepsToAdd = [];
    recipe.steps.forEach((step) => {
      let newStep = {
        step_text: step.step_text,
        step_number: step.step_number,
        recipe_id: newRecipe_id,
      };
      stepsToAdd.push(newStep);
    });
    try {
      await trx("steps").insert(stepsToAdd);
    } catch (err) {
      res.status(401).json(err);
    }

    let ingredientsToAdd = [];
    recipe.ingredients.forEach((ingredient) => {
      let newIngredient = {
        ingredient_name: ingredient.ingredient_name,
        quantity: ingredient.quantity,
        recipe_id: newRecipe_id,
      };
      ingredientsToAdd.push(newIngredient);
    });
    try {
      await trx("ingredients").insert(ingredientsToAdd);
    } catch (err) {
      res.status(401).json(err);
    }
  });

  return getRecipeById(newRecipe_id);
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
    ingredients: [],
  };

  //update categories for recipe
  rawData.forEach((row) => {
    if (!recipe.categories.includes(row.category_name))
      recipe.categories.push(row.category_name);
  });

  // cutting repeated steps off of RawData (caused by categories column)
  let useData = [];
  if (recipe.categories.length > 1) {
    let category = recipe.categories[0];
    for (let i = 0; i < rawData.length; i++) {
      if (rawData[i].category_name === category) {
        useData.push(rawData[i]);
      }
    }
  } else {
    useData = rawData;
  }

  // push steps to recipe
  let counter = [];
  for (let i = 0; i < useData.length; i++) {
    if (!counter.includes(useData[i].step_number)) {
      recipe.steps.push({
        step_number: useData[i].step_number,
        step_text: useData[i].step_text,
      });
      counter.push(useData[i].step_number);
    }
  }

  // push ingredients to recipe
  let ingredientsTracker = [];
  useData.forEach((ingredient) => {
    for (let i = 0; i < recipe.steps.length + 1; i++) {
      if (!ingredientsTracker.includes(ingredient.ingredient_name)) {
        recipe.ingredients.push({
          quantity: ingredient.quantity,
          ingredient_name: ingredient.ingredient_name,
        });
        ingredientsTracker.push(ingredient.ingredient_name);
      }
    }
  });

  return recipe;
}

async function getRecipeById(recipe_id) {
  const rawData = await db("recipes as r")
    .leftJoin("steps as s", "s.recipe_id", "r.recipe_id")
    .leftJoin("recipe_categories as rcat", "rcat.recipe_id", "r.recipe_id")
    .leftJoin("categories as cat", "cat.category_id", "rcat.category_id")
    .leftJoin("ingredients as i", "r.recipe_id", "i.recipe_id")
    .select(
      "r.recipe_id",
      "r.title",
      "r.source",
      "r.image",
      "r.user_id",
      "cat.category_name",
      "s.step_number",
      "s.step_text",
      "i.quantity",
      "i.ingredient_name"
    )
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
    .where("cat.category_name", category_name);
}

module.exports = {
  getAllRecipes,
  getMyRecipes,
  getRecipeById,
  getRecipesByCategory,
  addRecipe,
};

// will probs delete later
async function getRecipe(filter) {
  // const rawData = await db("recipes as r")
  //   .join("steps as s", "s.recipe_id", "r.recipe_id")
  //   .join("recipe_categories as rcat", "rcat.recipe_id", "r.recipe_id")
  //   .join("categories as cat", "cat.category_id", "rcat.category_id")
  //   .leftJoin("steps_ingredients as si", "si.step_id", "s.step_id")
  //   .leftJoin("ingredients as i", "si.ingredient_id", "i.ingredient_id")
  //   .select( "r.recipe_id", "r.title", "r.source", "r.image", "r.user_id", "cat.category_name", "s.step_number", "s.step_text", "si.quantity", "i.ingredient_name" )
  //   .orderBy("s.step_number")
  //   .where(filter);
  // const processed = buildRecipe(rawData);
  // return processed;
}

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
