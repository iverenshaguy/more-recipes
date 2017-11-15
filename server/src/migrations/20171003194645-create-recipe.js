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
      type: Sequelize.STRING,
      allowNull: true,
    },
    cookTime: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    totalTime: {
      type: Sequelize.STRING,
      allowNull: false
    },
    difficulty: {
      type: Sequelize.ENUM,
      allowNull: true,
      values: ['Easy', 'Normal', 'A Bit Difficult', 'Difficult', 'Very Difficult'],
    },
    extraInfo: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    vegetarian: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    ingredients: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
      allowNull: false,
      defaultValue: []
    },
    preparations: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
      allowNull: true,
      defaultValue: []
    },
    directions: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
      allowNull: false,
      defaultValue: []
    },
    upvotes: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    downvotes: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    views: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0
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
      },
    },
  }),
  down: queryInterface => queryInterface.dropTable('Recipes')
};
