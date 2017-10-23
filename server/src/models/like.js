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
  });
  Like.associate = (models) => {
    Like.belongsTo(models.Recipe);
    Like.belongsTo(models.User);
  };

  return Like;
};
