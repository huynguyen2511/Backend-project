'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role, {foreignKey: 'role_code', targetKey: 'code', as: 'roleData'})
      User.hasMany(models.AppliedCv, { foreignKey: 'userId', as: 'userAppliedCv' })
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,

    avatar: DataTypes.STRING,
    birthYear: DataTypes.STRING,
    gender: DataTypes.STRING,
    profession: DataTypes.STRING,
    experience: DataTypes.STRING,
    qualification: DataTypes.STRING,
    engLevel: DataTypes.STRING,
    workLocation: DataTypes.STRING,
    workForm: DataTypes.STRING,
    desiredSalary: DataTypes.STRING,
    homeTown: DataTypes.STRING,
    wishes: DataTypes.STRING,
    introduce: DataTypes.STRING,
    
    role_code: DataTypes.STRING,
    refresh_token: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};