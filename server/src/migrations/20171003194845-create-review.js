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
  down: queryInterface => queryInterface.dropTable('Reviews')
};
