'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Company.belongsTo(models.Employer, { foreignKey: 'employerId', targetKey: 'id', as: 'employer' })
    }
  }
  Company.init({
    employerId: DataTypes.STRING,
    company_name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    taxCode: DataTypes.STRING,
    field_of_activity: DataTypes.STRING,
    staffSize: DataTypes.STRING,
    workLocation: DataTypes.STRING,
    district: DataTypes.STRING,
    description: DataTypes.TEXT,



  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};