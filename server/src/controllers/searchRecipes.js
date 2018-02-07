import { Sequelize, sequelize, Recipe, Review } from '../models';
import getRecipes from '../helpers/getRecipes';

const { Op } = Sequelize;

export default {
  getUpvoted: (req, res, next) => {
    let orderBy = 'DESC';

    const { order } = req.query;

    if (order === 'descending') {
      orderBy = 'ASC';
    }

    return Recipe.findAll({
      where: { upvotes: { [Op.ne]: 0 } },
      attributes: {
        include: [[sequelize.fn('AVG', sequelize.col('reviews.rating')), 'rating']]
      },
      include: [
        {
          model: Review,
          as: 'reviews',
          attributes: []
        }
      ],
      order: [['upvotes', orderBy]],
      group: ['Recipe.id']
    })
      .then((recipes) => {
        if (recipes.length === 0) {
          return res.status(200).send({ message: 'There are no upvoted recipes' });
        }

        return getRecipes(req, res, recipes);
      })
      .catch(next);
  },

  search: (req, res, next) => {
    const { search } = req.query;

    return Recipe.findAll({
      where: {
        [Op.or]: [
          { recipeName: { [Op.iLike]: `%${search}%` } },
          { ingredients: { [Op.contains]: [search] } }
        ]
      },
      attributes: {
        include: [[sequelize.fn('AVG', sequelize.col('reviews.rating')), 'rating']]
      },
      include: [
        {
          model: Review,
          as: 'reviews',
          attributes: []
        }
      ],
      group: ['Recipe.id']
    })
      .then((recipes) => {
        if (recipes.length === 0) {
          return res.status(200).send({ message: 'Your search returned no results' });
        }

        return getRecipes(req, res, recipes);
      })
      .catch(next);
  }
};
