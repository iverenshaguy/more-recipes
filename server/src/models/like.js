export default (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    like: {
      type: DataTypes.BOOLEAN,
      validate: {
        isIn: {
          args: [[false, true]],
          msg: 'Please select a field'
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
  Like.associate = (models) => {
    Like.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
    });
    Like.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  };

  return Like;
};
