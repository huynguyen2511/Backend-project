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

      
    }
  }
  JobPost.init({
    title: DataTypes.STRING,
    attributesId: DataTypes.STRING,
    provinceCode: DataTypes.STRING,
    address: DataTypes.STRING,
    employerId: DataTypes.STRING,
    labelCode: DataTypes.STRING,
    categoryCode: DataTypes.STRING,
    overviewId: DataTypes.STRING,
    areaCode: DataTypes.STRING,
    description: DataTypes.TEXT,

  }, {
    sequelize,
    modelName: 'JobPost',
  });
  return JobPost;
};