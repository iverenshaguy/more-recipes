import { Sequelize, sequelize, Recipe, Review, User } from '../models';
import getItems from '../helpers/getItems';

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
        },
        {
          model: User,
          as: 'User',
          attributes: ['id', 'username', 'profilePic']
        }
      ],
      order: [['upvotes', orderBy]],
      group: ['Recipe.id', 'User.id']
    })
      .then(recipes => getItems(req, res, recipes, 'recipes'))
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
        },
        {
          model: User,
          as: 'User',
          attributes: ['id', 'username', 'profilePic']
        }
      ],
      group: ['Recipe.id', 'User.id']
    })
      .then(recipes => getItems(req, res, recipes, 'recipes'))
      .catch(next);
  }
};
