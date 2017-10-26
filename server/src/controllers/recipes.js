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
};
