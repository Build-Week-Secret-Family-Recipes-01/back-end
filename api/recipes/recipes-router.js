const express = require("express");
const router = express.Router();

const Recipes = require("./recipes-model");

const { validateRecipe } = require("./recipes-middleware");
const { 
  loggedInCheck,
  permissionsCheck, 
  privateRecipeCheck 
} = require("../auth/auth-middleware");

router.get("/", (req, res, next) => {
// router.get("/", loggedInCheck, permissionsCheck("admin"), (req, res, next) => {
  Recipes.getAllRecipes()
    .then((recipes) => {
      res.status(200).json(recipes);
    })
    .catch(next);
});

router.post("/", validateRecipe, (req, res, next) => {
  Recipes.addRecipe(req.body)
    .then((recipe) => {
      res.status(201).json(recipe);
    })
    .catch(next);
});

router.get("/:recipe_id", loggedInCheck, privateRecipeCheck, (req, res, next) => {
  const recipe_id = req.params.recipe_id;
  Recipes.getRecipeById(recipe_id)
    .then((recipe) => {
      res.status(200).json(recipe);
    })
    .catch(next);
});

router.put("/:recipe_id", loggedInCheck, privateRecipeCheck, (req, res, next) => {
  const updates = req.body;
  updates.recipe_id = req.params.recipe_id;
  Recipes.updateRecipe(updates)
    .then((recipe) => {
      res.status(200).json(recipe);
    })
    .catch(next);
});

router.get("/category/:category_id", (req, res, next) => {
  const category_id = req.params.category_id;
  Recipes.getRecipesByCategory(category_id)
    .then((recipes) => {
      if (recipes.length === 0) {
        res
          .status(200)
          .json({ message: "There are no recipes in this category" });
      } else {
        res.status(200).json(recipes);
      }
    })
    .catch(next);
});

router.delete('/:recipe_id', loggedInCheck, privateRecipeCheck, (req, res, next) => {
  Recipes.deleteRecipe(req.params.recipe_id)
    .then(count => {
      if (count > 0) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: 'Record not found' });
      }
    })
    .catch(next);
})

module.exports = router;
