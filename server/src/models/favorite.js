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
    Favorite.belongsTo(models.Recipe, {
      foreignKey: 'userId',
    });
    Favorite.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  };

  return Favorite;
};
