export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Favorites', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    favorite: {
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
  down: queryInterface => queryInterface.dropTable('Favorites')
};
