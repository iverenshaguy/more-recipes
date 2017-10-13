export default (sequelize, DataTypes) => {
  const Direction = sequelize.define('Direction', {
    directionText: {
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
    directionNumber: {
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
    }
  });
  Direction.associate = (models) => {
    Direction.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
    });
  };

  return Direction;
};
