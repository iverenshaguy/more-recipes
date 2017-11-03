export default (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    upvote: {
      type: DataTypes.BOOLEAN,
      validate: {
        isIn: {
          args: [[false, true]],
          msg: 'Please true for Upvote and false for Downvote'
        }
      }
    },
  });
  Like.associate = (models) => {
    Like.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
    Like.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return Like;
};
