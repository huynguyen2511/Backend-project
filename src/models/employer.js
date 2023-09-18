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
    }
  }
  Employer.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    sex: DataTypes.STRING,
    phone: DataTypes.STRING,
    jobPosition: DataTypes.STRING,
    workLocation: DataTypes.STRING,
    district: DataTypes.STRING,
    avatar: DataTypes.STRING,
    role_code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Employer',
  });
  return Employer;
};