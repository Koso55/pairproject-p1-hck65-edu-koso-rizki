'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserHasCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static async enrollCourseUser(courseId, id) {
      try {
        await UserHasCourse.create({ user_id: id, course_id: courseId });
      } catch (error) {
        throw error
      }
    }
  }
  UserHasCourse.init({
    user_id: DataTypes.INTEGER,
    course_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserHasCourse',
  });
  return UserHasCourse;
};