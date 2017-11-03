export default (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: 'This is a required field'
      },
      validate: {
        isIn: {
          args: [[1, 2, 3, 4, 5]],
          msg: 'Please rate the recipe'
        }
      }
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: {
        args: false,
        msg: 'This is a required field'
      },
      validate: {
        is: {
          args: /^[a-z 0-9 ,.'-()\s]+$/i,
          msg: 'Input is not valid'
        }
      }
    },
  });
  Review.associate = (models) => {
    Review.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
    Review.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return Review;
};
