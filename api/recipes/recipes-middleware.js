const validateRecipe = async (req, res, next) => {
    const recipe = req.body;
    try {
        if (!recipe.title || !recipe.categories || !recipe.steps || !recipe.ingredients) {
            res.status(401).json({ message: "Recipes require a title, category, steps, and ingredients." })
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
