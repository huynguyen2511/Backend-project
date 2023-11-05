'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JobPost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // JobPost.belongsTo(models.Employer, { foreignKey: 'employerId', targetKey: 'id', as: 'employer' })
      JobPost.belongsTo(models.Attribute, { foreignKey: 'attributesId', targetKey: 'id', as: 'attributes' })
      JobPost.belongsTo(models.Employer, { foreignKey: 'employerId', targetKey: 'id', as: 'employer' })
      JobPost.belongsTo(models.Overview, { foreignKey: 'overviewId', targetKey: 'id', as: 'overview' })
      JobPost.belongsTo(models.Company, { foreignKey: 'companyId', targetKey: 'id', as: 'companyPost' })
      JobPost.belongsTo(models.Province, { foreignKey: 'provinceCode', targetKey: 'code', as: 'province' })
    }
  }
  JobPost.init({
    title: DataTypes.STRING,
    attributesId: DataTypes.STRING,
    provinceCode: DataTypes.STRING,
    address: DataTypes.STRING,
    employerId: DataTypes.STRING,
    companyId: DataTypes.STRING,
    labelCode: DataTypes.STRING,
    categoryCode: DataTypes.STRING,
    overviewId: DataTypes.STRING,
    description: DataTypes.TEXT,

  }, {
    sequelize,
    modelName: 'JobPost',
  });
  return JobPost;
};