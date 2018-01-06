export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Likes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      upvote: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId'
        }
      },
      recipeId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: true,
        references: {
          model: 'Recipes',
          key: 'id',
          as: 'recipeId'
        }
      }
    }),
  down: queryInterface => queryInterface.dropTable('Likes')
};
