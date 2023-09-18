'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Employers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {type: Sequelize.STRING },
      email: {type: Sequelize.STRING },
      password: {type: Sequelize.STRING },
      sex: {type: Sequelize.STRING },
      phone: {type: Sequelize.STRING },
      jobPosition: {type: Sequelize.STRING },
      workLocation: {type: Sequelize.STRING },
      district: {type: Sequelize.STRING },
      avatar: {type: Sequelize.STRING },
      role_code: {type: Sequelize.STRING, defaultValue:'R3'},
      
      createdAt: {
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Employers');
  }
};