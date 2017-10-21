export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Likes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    like: {
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
      allowNull: false,
      foreignKey: true,
      type: Sequelize.INTEGER
    },
    recipeId: {
      allowNull: false,
      foreignKey: true,
      type: Sequelize.INTEGER
    },
  }),
  down: queryInterface => queryInterface.dropTable('Likes')
};
