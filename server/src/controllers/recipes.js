import del from 'del';
import path from 'path';
import Pagination from '../helpers/pagination';
import { sequelize, Recipe, User, Review } from '../models';

const uploadPath = path.resolve(__dirname, '../../../client/public/images/recipes');

export default {
  create(req, recipeData, res, next) {
    return Recipe
      .create({
        recipeName: recipeData.recipeName,
        prepTime: recipeData.prepTime,
        cookTime: recipeData.cookTime,
        totalTime: recipeData.totalTime,
        difficulty: recipeData.difficulty,
        extraInfo: recipeData.extraInfo,
        vegetarian: recipeData.vegetarian,
        userId: req.id,
        ingredients: recipeData.ingredients,
        preparations: recipeData.preparations,
        directions: recipeData.directions
      }, {
        include: [
          User
        ]
      })
      .then(recipe => res.status(201).send(recipe))
      .catch(next);
  },

  upload(req, recipeData, res, next) {
    return Recipe
      .findOne({ where: { id: +recipeData.recipeId, userId: req.id } })
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({ message: 'Recipe Not Found' });
        }

        const savedImage = `${uploadPath}/${recipe.recipeImage}`;

        del.sync([savedImage]);

        return recipe
          .update({ recipeImage: req.file.filename })
          .then(() => res.status(201).send(recipe))
          .catch(next);
      })
      .catch(next);
  },

  viewRecipe(req, recipeData, res, next) {
    return Recipe
      .findOne({
        where: { id: +recipeData.recipeId },
        attributes: {
          include: [
            [sequelize.fn('AVG', sequelize.col('reviews.rating')), 'rating'],
          ],
        },
        include: [
          {
            model: Review,
            as: 'reviews',
            attributes: ['rating', 'comment', 'userId']
          },
        ],
        group: ['Recipe.id', 'reviews.id']
      })
      .then(recipe => recipe.increment('views').then(() => res.status(200).send(recipe)))
      .catch(next);
  },

  update(req, recipeData, res, next) {
    return Recipe
      .findOne({ where: { id: +recipeData.recipeId, userId: req.id } })
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({ message: 'Recipe Not Found' });
        }

        return recipe
          .update(Object.assign(recipe, recipeData))
          .then(() => res.status(200).send(recipe))
          .catch(next);
      })
      .catch(next);
  },

  delete(req, recipeData, res, next) {
    return Recipe
      .findOne({ where: { id: recipeData.recipeId, userId: req.id } })
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({ message: 'Recipe Not Found' });
        }

        const savedImage = `${uploadPath}/${recipe.recipeImage}`;

        del.sync([savedImage]);

        return recipe
          .destroy()
          .then(() => res.status(204).send())
          .catch(next);
      })
      .catch(next);
  },

  list(req, res, next) {
    return Recipe
      .findAll({
        attributes: {
          include: [
            [sequelize.fn('AVG', sequelize.col('reviews.rating')), 'rating'],
          ],
        },
        include: [
          {
            model: Review,
            as: 'reviews',
            attributes: []
          },
        ],
        group: ['Recipe.id']
      })
      .then((recipes) => {
        const { limit, page } = req.query;

        if (limit && page) {
          const paginate = new Pagination(recipes, parseInt(limit, 10));

          const { recipesByPage, metaData } = paginate.getRecipesForPage(parseInt(page, 10));

          return res.status(200).send({ recipes: recipesByPage, metaData });
        }

        const paginate = new Pagination(recipes);

        const { recipesByPage, metaData } = paginate.getRecipesForPage();

        return res.status(200).send({ recipes: recipesByPage, metaData });
      })
      .catch(next);
  }
};
