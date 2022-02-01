const express = require("express");
const router = express.Router();

const Recipes = require("./recipes-model");

const { validateRecipe } = require("./recipes-middleware");

router.get("/", (req, res, next) => {
  Recipes.getAllRecipes()
    .then((recipes) => {
      res.status(200).json(recipes);
    })
    .catch(next);
});

router.post("/", validateRecipe, (req, res, next) => {
  // const recipe = { 
  //   title: req.body.title,
  //   source: req.body.source,
  //   image: req.body.image,
  //   user_id: req.session.user.user_id 
  // };
  // const category = {
  //   req.body.categories
  // }

  Recipes.addRecipe(req.body)
    .then((recipe) => {
      res.status(201).json(recipe);
    })
    .catch(next);
});

router.get("/:recipe_title", (req, res, next) => {
  const title = req.params.recipe_title;
  Recipes.getRecipe({ title })
    .then((recipes) => {
      res.status(200).json(recipes);
    })
    .catch(next);
});

router.get("/id/:recipe_id", (req, res, next) => {
  const recipe_id = req.params.recipe_id;
  Recipes.getRecipeById( recipe_id )
    .then((recipes) => {
      res.status(200).json(recipes);
    })
    .catch(next);
});

router.get("/category/:category_name", (req, res, next) => {
  const category_name = req.params.category_name;
  Recipes.getRecipesByCategory( category_name )
    .then((recipes) => {
      if (recipes.length === 0) {
        res.status(200).json({ message: "There are no recipes in this category" });
      } else {
        res.status(200).json(recipes);
      }
    })
    .catch(next);
});

module.exports = router;
