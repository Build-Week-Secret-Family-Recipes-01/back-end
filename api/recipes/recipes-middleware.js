const dbConfig = require("../data/db-config");

const validateRecipe = async (req, res, next) => {
    try {
        
        next();
    } catch (err) {
      next(err);
    }
  };

module.exports = {
    validateRecipe
};
