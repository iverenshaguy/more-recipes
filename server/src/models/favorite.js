export default (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    favorite: {
      type: DataTypes.BOOLEAN,
      validate: {
        isIn: {
          args: [[false, true]],
          msg: 'Please select a field'
        }
      }
    },
  });
  Favorite.associate = (models) => {
    Favorite.belongsTo(models.Recipe);
    Favorite.belongsTo(models.User);
  };

  return Favorite;
};
