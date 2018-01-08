import { Sequelize, sequelize, Recipe, Review } from '../models';
import Pagination from '../helpers/pagination';

const { Op } = Sequelize;

export default {
  getUpvoted: (req, res, next) => {
    let orderBy = 'DESC';

    const { order, limit, page } = req.query;

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

        if (limit && page) {
          const paginate = new Pagination(recipes, parseInt(limit, 10));

          const { recipesByPage, metaData } = paginate.getRecipesForPage(parseInt(page, 10));

          return res.status(200).send({ recipes: recipesByPage, metaData });
        }

        return res.status(200).send(recipes);
      })
      .catch(next);
  },

  search: (req, res, next) => {
    const { search, limit, page } = req.query;

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

        if (limit && page) {
          const paginate = new Pagination(recipes, parseInt(limit, 10));

          const { recipesByPage, metaData } = paginate.getRecipesForPage(parseInt(page, 10));

          return res.status(200).send({ recipes: recipesByPage, metaData });
        }

        return res.status(200).send(recipes);
      })
      .catch(next);
  }
};
