import { Sequelize, sequelize, Recipe, Review } from '../models';

const { Op } = Sequelize;

export default {
  getUpvoted: (req, res, next) => {
    let orderBy = 'DESC';

    if (req.query.order === 'descending') {
      orderBy = 'ASC';
    }

    return Recipe.findAll({
      where: { upvotes: { [Op.ne]: 0 } },
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
        }
      ],
      order: [['upvotes', orderBy]],
      group: ['Recipe.id']
    })
      .then((recipes) => {
        if (recipes.length === 0) {
          return res.status(200).send({ message: 'There are no upvoted recipes' });
        }

        return res.status(200).send(recipes);
      })
      .catch(next);
  }
};
