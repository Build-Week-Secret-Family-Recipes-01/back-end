const dbConfig = require("../data/db-config");

const validateRecipe = async (req, res, next) => {
    const recipe = req.body;
    try {
        if (!recipe.title || !recipe.categories || !recipe.steps) {
            res.status(401).json({ message: "Recipes require a title, category, and steps." })
        } else {
            next();
        }
    } catch (err) {
      next(err);
    }
  };

module.exports = {
    validateRecipe
};
