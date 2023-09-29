'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class License extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  License.init({
    related_documents: DataTypes.STRING,
    additional_documents: DataTypes.STRING,
    statusCode: DataTypes.STRING,
    employerId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'License',
  });
  return License;
};