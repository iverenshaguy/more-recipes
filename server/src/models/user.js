import { hashPassword } from '../validations/password_hash';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING
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
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password cannot be empty'
        }
      }
    },
    password: {
      type: DataTypes.VIRTUAL
    },
    passwordConfirm: {
      type: DataTypes.VIRTUAL
    },
    aboutMe: {
      type: DataTypes.TEXT
    },
    occupation: {
      type: DataTypes.STRING
    },
    profilePic: {
      type: DataTypes.STRING
    },
    coverPhoto: {
      type: DataTypes.STRING
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
