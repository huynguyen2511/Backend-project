'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AppliedCv extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AppliedCv.belongsTo(models.User, {foreignKey: 'userId', targetKey: 'id', as: 'userAppliedCv'})
      AppliedCv.belongsTo(models.UserCv, {foreignKey: 'userCvId', targetKey: 'id', as: 'cvAppliedCv'})
      AppliedCv.belongsTo(models.JobPost, {foreignKey: 'jobPostId', targetKey: 'id', as: 'postAppliedCv'})
      AppliedCv.belongsTo(models.Employer, {foreignKey: 'employerId', targetKey: 'id', as: 'employerAppliedCv'})
    }
  }
  AppliedCv.init({
    userId: DataTypes.STRING,
    userCvId: DataTypes.STRING,
    employerId: DataTypes.STRING,
    jobPostId: DataTypes.STRING,
    status: DataTypes.STRING,
    dateApply: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'AppliedCv',
  });
  return AppliedCv;
};