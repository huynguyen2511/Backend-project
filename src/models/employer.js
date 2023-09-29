'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Employer.belongsTo(models.Role, {foreignKey: 'role_code', targetKey: 'code', as: 'roleData'})
      Employer.hasOne(models.Company, { foreignKey: 'employerId', as: 'employerComp' })
      Employer.hasMany(models.JobPost, { foreignKey: 'employerId', as: 'employerPost' })
    }
  }
  Employer.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    gender: DataTypes.STRING,
    phone: DataTypes.STRING,
    jobPosition: DataTypes.STRING,
    avatar: DataTypes.BLOB,
    role_code: DataTypes.STRING,
    refresh_token: DataTypes.STRING,
    statusCode: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Employer',
  });
  return Employer;
};