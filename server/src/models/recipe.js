export default (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    recipeName: {
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
    recipeImage: {
      type: DataTypes.STRING,
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
    prepTime: {
      type: DataTypes.STRING,
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
    cookTime: {
      type: DataTypes.STRING,
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
    totalTime: {
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
    difficulty: {
      type: DataTypes.ENUM('Easy', 'Normal', 'A Bit Difficult', 'Difficult', 'Very Difficult'),
      validate: {
        isIn: {
          args: [['Easy', 'Normal', 'A Bit Difficult', 'Difficult', 'Very Difficult']],
          msg: 'Please select a field'
        }
      }
    },
    extraInfo: {
      type: DataTypes.STRING,
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
    vegetarian: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      validate: {
        isIn: {
          args: [[false, true]],
          msg: 'Please select a field'
        }
      }
    },
    upvotes: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          args: true,
          msg: 'Input can only be a number'
        }
      }
    },
    downvotes: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          args: true,
          msg: 'Input can only be a number'
        }
      }
    },
    totalFavorites: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          args: true,
          msg: 'Input can only be a number'
        }
      }
    }
  });
  Recipe.associate = (models) => {
    Recipe.belongsTo(models.User, {
      foreignKey: 'userId',
    });
    Recipe.hasMany(models.Ingredient, {
      foreignKey: 'recipeId',
      as: 'ingredient',
    });
    Recipe.hasMany(models.Preparation, {
      foreignKey: 'recipeId',
      as: 'preparation',
    });
    Recipe.hasMany(models.Direction, {
      foreignKey: 'recipeId',
      as: 'directions',
    });
    Recipe.hasMany(models.Like, {
      foreignKey: 'recipeId',
      as: 'likes',
    });
    Recipe.hasMany(models.Favorite, {
      foreignKey: 'recipeId',
      as: 'favorites',
    });
    Recipe.hasMany(models.Review, {
      foreignKey: 'recipeId',
      as: 'reviews',
    });
  };

  return Recipe;
};
