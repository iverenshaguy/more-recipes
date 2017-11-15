import { Recipe, Favorite } from '../models';

export default {
  addFavoriteRecipe: (req, favoriteData, res, next) => Favorite.findOne({
    where: {
      recipeId: +favoriteData.recipeId,
      userId: req.session.user.id
    }
  })
    .then((favorited) => {
      if (favorited) {
        favorited.destroy().then(() => Recipe.findAll({
          include: [{
            model: Favorite,
            as: 'favorites',
            attributes: [],
            where: {
              userId: req.session.user.id,
            }
          }],
        })
          .then(recipes => res.status(200).send({
            message: 'Recipe has been removed from favorites',
            recipes
          })))
          .catch(next);
        return;
      }

      return Favorite
        .create({
          favorite: true,
          recipeId: +favoriteData.recipeId,
          userId: req.session.user.id
        })
        .then(() => Recipe.findAll({
          include: [{
            model: Favorite,
            as: 'favorites',
            attributes: [],
            where: {
              userId: req.session.user.id,
            }
          }],
        })
          .then(recipes => res.status(201).send({
            message: 'Recipe has been added to favorites',
            recipes
          })))
        .catch(next);
    })
    .catch(next),

  getFavorites: (req, favoriteRecipeData, res, next) => {
    if (+req.session.user.id !== +req.params.userId) {
      return res.status(401).send({ message: 'You are not authorized to access this page' });
    }

    return Recipe.findAll({
      include: [{
        model: Favorite,
        as: 'favorites',
        attributes: [],
        where: {
          userId: +favoriteRecipeData.userId,
        }
      }],
    })
      .then((recipes) => {
        if (recipes.length === 0) {
          return res.status(200).send({ message: 'You have no favorite recipes' });
        }

        return res.status(200).send(recipes);
      })
      .catch(next);
  }
};
