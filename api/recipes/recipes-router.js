const express = require("express");
const router = express.Router();

const Recipes = require("./recipes-model");

router.get("/", (req, res, next) => {
  Recipes.getAllRecipes()
    .then((recipes) => {
      res.status(200).json(recipes);
    })
    .catch(next);
});

module.exports = router;
