import { Recipe, User } from '../models';

export default {
  create(req, recipeData, res) {
    Recipe.create({
      recipeName: recipeData.recipeName,
      prepTime: recipeData.prepTime,
      cookTime: recipeData.cookTime,
      totalTime: recipeData.totalTime,
      difficulty: recipeData.difficulty,
      extraInfo: recipeData.extraInfo,
      vegetarian: recipeData.vegetarian,
      recipeImage: recipeData.recipeImage,
      userId: req.session.user.id,
      ingredients: recipeData.ingredients,
      preparations: recipeData.preparations,
      directions: recipeData.directions
    }, {
      include: [
        User
      ]
    })
      .then(recipe => res.status(201).send(recipe));
  },

  update(req, recipeData, res) {
    return Recipe
      .findOne({ where: { id: req.params.id, userId: req.session.user.id } })
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({ message: 'Recipe Not Found' });
        }

        return recipe
          .update(Object.assign(recipe, recipeData))
          .then(() => res.status(200).send(recipe));
      });
  },

  delete(req, res) {
    return Recipe
      .findOne({ where: { id: req.params.id, userId: req.session.user.id } })
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({ message: 'Recipe Not Found' });
        }

        return recipe
          .destroy()
          .then(() => res.status(204).send());
      });
  },

  list(req, res) {
    return Recipe
      .all()
      .then(recipes => res.status(200).send(recipes));
  }
};
