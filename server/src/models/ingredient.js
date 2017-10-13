export default (sequelize, DataTypes) => {
  const Ingredient = sequelize.define('Ingredient', {
    ingredientName: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'This is a required field'
      },
      validate: {
        is: {
          args: /^[a-zA-Z0-9\s]*$/,
          msg: 'Input is not valid'
        },
        notEmpty: {
          args: true,
          msg: 'Input cannot be empty'
        }
      }
    },
  });
  Ingredient.associate = (models) => {
    Ingredient.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
    });
  };

  return Ingredient;
};
