export default (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    category: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
      validate: {
        is: {
          args: /^[a-z 0-9 ,.'-()\s]+$/i,
          msg: 'Input is not valid'
        }
      }
    },
  });
  Category.associate = (models) => {
    Category.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Category.hasMany(models.Favorite, {
      foreignKey: 'categoryId',
      as: 'favorites',
    });
  };

  return Category;
};
