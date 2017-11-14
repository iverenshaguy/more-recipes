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
    Favorite.belongsTo(models.Category, {
      foreignKey: 'categoryId',
    });
    Favorite.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
    Favorite.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return Favorite;
};
