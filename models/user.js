'use strict';
var bcrypt = require('bcryptjs');
const { Op } = require("sequelize");
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
        return await User.create({ userName: userName, password: password, email: email })
      } catch (error) {
        throw error
      }
    }
    static async findUserbyId(newUser) {
      try {
        const newUserId = newUser.id
        // console.log(newUserId)
        let userId = await User.findOne({
          where: {
            id: newUserId
          }
        })
        console.log(userId.id)
        return userId.id
      } catch (error) {
        throw error
      }
    }
    static async loginFormPost(data) {
      try {
        const { userName, password, email } = data
        let findUser = await User.findOne({ where: { userName } })
        // console.log("findUser"," FIND USER MODEL")
        if (findUser) {
          const isValidPassword = bcrypt.compareSync(password, findUser.password)
          // console.log("isValidPassword", "ISVALIDPASSWORD MODEL")
          const isValidEmail = bcrypt.compareSync(email, findUser.email)
          if (isValidPassword && isValidEmail) { //kenapa kalo && gagal???
            return { findUser, validator: true }
          } else {
            throw {
              type: "failedLogin",
              message: "Invalid username or email"
            }
          }
        } else {
          throw {
            type: "failedLogin",
            message: "Invalid username or password"
          }
        }
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
        notEmpty: {
          msg: "username is required"
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
        notEmpty: {
          msg: "password is required"
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
        notEmpty: {
          msg: "email is required"
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