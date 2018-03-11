export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      passwordHash: {
        type: DataTypes.STRING
      },
      aboutMe: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      occupation: {
        type: DataTypes.STRING,
        allowNull: true
      },
      profilePic: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          isUrl: true,
          notEmpty: {
            args: true,
            msg: 'Input cannot be empty'
          }
        }
      }
    }
  );
  User.associate = (models) => {
    User.hasMany(models.Recipe, {
      foreignKey: 'userId',
      as: 'recipes'
    });
    User.hasMany(models.Like, {
      foreignKey: 'userId',
      as: 'likes'
    });
    User.hasMany(models.Review, {
      foreignKey: 'userId',
      as: 'reviews'
    });
    User.hasMany(models.Notification, {
      foreignKey: 'userId',
      as: 'notifications'
    });
    User.hasMany(models.Favorite, {
      foreignKey: 'userId',
      as: 'favorites'
    });
    User.hasMany(models.Category, {
      foreignKey: 'userId',
      as: 'categories'
    });
  };

  return User;
};
