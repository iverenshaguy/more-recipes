export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Preparations', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    preparationText: {
      type: Sequelize.STRING,
      allowNull: false
    },
    preparationNumber: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('Preparations')
};
