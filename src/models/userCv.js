'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCv extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserCv.belongsTo(models.User, {foreignKey: 'userId', targetKey: 'id', as: 'userData'})
      UserCv.hasMany(models.AppliedCv, { foreignKey: 'userCvId', as: 'cvAppliedCv' })
    }
  }
  UserCv.init({
    userId: DataTypes.STRING,
    cv_name: DataTypes.STRING,
    cv_document: DataTypes.STRING,
    status: DataTypes.STRING,
    findStatus: DataTypes.STRING,
    published: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'UserCv',
  });
  return UserCv;
};