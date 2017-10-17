export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Recipes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    recipeName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    recipeImage: {
      type: Sequelize.STRING,
      allowNull: true
    },
    prepTime: {
      type: Sequelize.STRING
    },
    cookTime: {
      type: Sequelize.STRING
    },
    totalTime: {
      type: Sequelize.STRING,
      allowNull: false
    },
    difficulty: {
      type: Sequelize.ENUM,
      values: ['Easy', 'Normal', 'A Bit Difficult', 'Difficult', 'Very Difficult'],
    },
    extraInfo: {
      type: Sequelize.STRING
    },
    vegetarian: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    ingredients: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
      allowNull: false
    },
    preparations: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
      allowNull: false
    },
    directions: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
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
  down: queryInterface => queryInterface.dropTable('Recipes')
};
