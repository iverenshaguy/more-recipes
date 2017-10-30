export default (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    upvote: {
      type: DataTypes.BOOLEAN,
      validate: {
        isIn: {
          args: [[false, true]],
          msg: 'Please select a field'
        }
      }
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
