export default (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    rating: {
      type: DataTypes.ENUM,
      values: ['1', '2', '3', '4', '5'],
      allowNull: {
        args: false,
        msg: 'This is a required field'
      },
      validate: {
        isIn: {
          args: [['1', '2', '3', '4', '5']],
          msg: 'Please rate the recipe'
        }
      }
    },
    comment: {
      type: DataTypes.TEXT,
      validate: {
        is: {
          args: /^[a-zA-Z0-9\s]*$/,
          msg: 'Input is not valid'
        }
      }
    },
    userId: {
      allowNull: false,
      foreignKey: true,
      type: DataTypes.INTEGER
    },
    recipeId: {
      allowNull: false,
      foreignKey: true,
      type: DataTypes.INTEGER
    },
  });
  Review.associate = (models) => {
    Review.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
    });
    Review.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  };

  return Review;
};
