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
          args: /^[a-z 0-9 ,.'-()\s]+$/i,
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
        // notEmpty: {
        //   args: true,
        //   msg: 'Input cannot be empty'
        // }
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
      type: DataTypes.ENUM,
      values: ['Easy', 'Normal', 'A Bit Difficult', 'Difficult', 'Very Difficult'],
      validate: {
        isIn: {
          args: [
            ['Easy', 'Normal', 'A Bit Difficult', 'Difficult', 'Very Difficult']
          ],
          msg: 'Please select a field'
        }
      }
    },
    extraInfo: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: /^[a-z 0-9 ,.'-()\s]+$/i,
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
          args: [
            [false, true]
          ],
          msg: 'Please select a field'
        }
      }
    },
    ingredients: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: {
        args: false,
        msg: 'This is a required field'
      },
      validate: {
        is: {
          args: /^[a-z 0-9 ,.'-()\s]+$/i,
          msg: 'Input is not valid'
        },
        notEmpty: {
          args: true,
          msg: 'Input cannot be empty'
        }
      }
    },
    preparations: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: {
        args: false,
        msg: 'This is a required field'
      },
      validate: {
        is: {
          args: /^[a-z 0-9 ,.'-()\s]+$/i,
          msg: 'Input is not valid'
        },
        notEmpty: {
          args: true,
          msg: 'Input cannot be empty'
        }
      }
    },
    directions: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: {
        args: false,
        msg: 'This is a required field'
      },
      validate: {
        is: {
          args: /^[a-z 0-9 ,.'-()\s]+$/i,
          msg: 'Input is not valid'
        },
        notEmpty: {
          args: true,
          msg: 'Input cannot be empty'
        }
      }
    }
  });
  Recipe.associate = (models) => {
    Recipe.belongsTo(models.User, {
      foreignKey: 'userId',
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
