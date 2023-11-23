'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserProfile.belongsTo(models.User, { foreignKey: "UserId" })
    }

    static async registerPost(data, userId) {
      // console.log(data)
      const { parentName, benefactor, phone, idCardNumber } = data
      let userProfile = await UserProfile.create({ parentName: parentName, benefactor: benefactor, phone: phone, idCardNumber: idCardNumber, UserId: userId })
      return userProfile
    }
  }
  UserProfile.init({
    parentName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Parent/Guardian's name is required"
        },
        notEmpty: {
          msg: "Parent/Guardian's name required"
        }
      }
    },
    benefactor: DataTypes.STRING, //handled in hooks
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "phone number is required"
        },
        notEmpty: {
          msg: "phone numbers name required"
        }
      }
    },
    idCardNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "idCardNumber is required"
        },
        notEmpty: {
          msg: "idCardNumber name required"
        }
      }
    },
    UserId: DataTypes.INTEGER //from instances
  }, {
    hooks: {
      beforeCreate(instance, options) {
        if (!instance.benefactor) {
          instance.benefactor = "no benefactor"
        }
      }
    },
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};