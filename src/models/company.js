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
      Company.hasOne(models.Employer, { foreignKey: 'companyId', as: 'employerComp' })
      Company.hasMany(models.JobPost, { foreignKey: 'companyId', as: 'companyPost' })
      Company.belongsTo(models.Province, { foreignKey: 'provinceCode', targetKey: 'code', as: 'province' })
    }
  }
  Company.init({
    companyName: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    taxCode: DataTypes.STRING,
    field_of_activity: DataTypes.STRING,
    staffSize: DataTypes.STRING,
    address: DataTypes.STRING,
    provinceCode: DataTypes.STRING,
    description: DataTypes.TEXT,

  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};