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
  Favorite.associate = (models) => {
    Favorite.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
    });
    Favorite.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  };

  return Favorite;
};
