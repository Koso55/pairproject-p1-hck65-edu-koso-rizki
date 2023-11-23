'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CourseDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CourseDetail.belongsTo(models.Course, { foreignKey: "CourseId" })
    }
    static async showCourseDetails(courseId) {
      try {
        let instance = CourseDetail.findAll({
          where: { CourseId: courseId }
        })
        return instance
      } catch (error) {
        throw error
      }
    }



  }
  CourseDetail.init({
    name: DataTypes.STRING,
    linkCourse: DataTypes.STRING,
    CourseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CourseDetail',
  });
  return CourseDetail;
};