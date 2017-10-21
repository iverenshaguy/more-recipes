export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Reviews', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    rating: {
      type: Sequelize.ENUM,
      values: ['1', '2', '3', '4', '5'],
      allowNull: false
    },
    comment: {
      type: Sequelize.TEXT
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
  down: queryInterface => queryInterface.dropTable('Reviews')
};
