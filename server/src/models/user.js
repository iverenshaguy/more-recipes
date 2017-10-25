import { hashPassword } from '../validations/password_hash';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: true,
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
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
    },
    aboutMe: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    occupation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profilePic: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: /^[a-zA-Z0-9\s]*$/,
          msg: 'Input is not valid'
        },
        // notEmpty: {
        //   args: true,
        //   msg: 'Input cannot be empty'
        // }
      }
    },
    coverPhoto: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: /^[a-zA-Z0-9\s]*$/,
          msg: 'Input is not valid'
        },
        // notEmpty: {
        //   args: true,
        //   msg: 'Input cannot be empty'
        // }
      }
    },
  }, {
    hooks: {
      beforeCreate: user => hashPassword(user.password).then((hash) => {
        user.passwordHash = hash;
      })
    }
  });
  User.associate = (models) => {
    User.hasMany(models.Recipe, {
      foreignKey: 'userId',
      as: 'recipes',
    });
    User.hasMany(models.Like, {
      foreignKey: 'userId',
      as: 'likes',
    });
    User.hasMany(models.Favorite, {
      foreignKey: 'userId',
      as: 'favorites',
    });
    User.hasMany(models.Review, {
      foreignKey: 'userId',
      as: 'reviews',
    });
    User.hasMany(models.Notification, {
      foreignKey: 'userId',
      as: 'notifications',
    });
  };

  return User;
};
