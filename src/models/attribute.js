'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attribute extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Attribute.hasOne(models.JobPost, { foreignKey: 'attributesId', as: 'attributes' })
    }
  }
  Attribute.init({
    salary: DataTypes.STRING,
    benefits: DataTypes.TEXT,
    requirements: DataTypes.TEXT,
    published: DataTypes.STRING,
    hashtag: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Attribute',
  });
  return Attribute;
};