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
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      allowNull: false,
      foreignKey: true
    },
    recipeId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Recipes',
        key: 'id'
      },
      allowNull: false,
      foreignKey: true
    },
  }),
  down: queryInterface => queryInterface.dropTable('Favorites')
};
