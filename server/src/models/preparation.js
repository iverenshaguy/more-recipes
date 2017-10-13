export default (sequelize, DataTypes) => {
  const Preparation = sequelize.define('Preparation', {
    preparationText: {
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
    preparationNumber: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: 'This is a required field'
      },
      validate: {
        isInt: {
          args: true,
          msg: 'Input can only be a number'
        }
      }
    },
  });
  Preparation.associate = (models) => {
    Preparation.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
    });
  };

  return Preparation;
};
