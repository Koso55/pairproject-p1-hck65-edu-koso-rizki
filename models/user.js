'use strict';
var bcrypt = require('bcryptjs');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.UserProfile, { foreignKey: "UserId" })
      User.belongsToMany(models.Course, { through: "UserHasCourse", foreignKey: "user_id" })
    }

    static async registerPost(data) {
      try {
        const { userName, password, confirmPassword, email } = data
        if (password !== confirmPassword) {
          throw {
            type: "passwordMismatch",
            message: "password do not match"
          }
        }
        await User.create({ userName: userName, password: password, email: email })
      } catch (error) {
        throw error
      }
    }

    
  }






  User.init({
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "username is required"
        },
        notEmpty:{
          msg:"username is required"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "password is required"
        },
        notEmpty:{
          msg:"password is required"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "email is required"
        },
        notEmpty:{
          msg:"email is required"
        }
      }
    },
    role: DataTypes.STRING //handled in hooks
  }, {
    hooks: {
      beforeCreate(instance, options) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(instance.password, salt);
        instance.password = hash

        instance.role = "user"
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};