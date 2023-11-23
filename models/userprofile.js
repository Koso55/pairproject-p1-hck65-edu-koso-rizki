'use strict';

const timeSince = require("../helper/helper.js")
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
    get yearBorn(){
      let thisYear = new Date().getFullYear()
      let yearBorn = thisYear - this.age
      return yearBorn
    }

    get dateJoined(){
      let since = timeSince(this.createdAt)
      return since
    }


    static associate(models) {
      // define association here
      UserProfile.belongsTo(models.User, { foreignKey: "UserId" })
    }

    static async registerPost(data, userId) {
      try {
        // console.log(data, "USER PROFILES")
        const { parentName, benefactor, age, gender, phone, idCardNumber } = data
        let userProfile = await UserProfile.create({ parentName: parentName, benefactor: benefactor, phone: phone, idCardNumber: idCardNumber, age: age, gender: gender, UserId: userId })
        return userProfile
      } catch (error) {
        throw error
      }
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
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "age is required"
        },
        notEmpty: {
          msg: "age name required"
        }
      }
    },
    gender: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "gender is required"
        },
        notEmpty: {
          msg: "gender name required"
        }
      }
    },
    
    UserId: DataTypes.INTEGER //from instances
  }, {
    hooks: {
      beforeCreate(instance, options) {
        if (!instance.benefactor) {
          instance.benefactor = "self"
        }
      }
    },
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};