'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Companies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      employerId: {type: Sequelize.STRING },
      companyName: {type: Sequelize.STRING },
      phone: {type: Sequelize.STRING },
      email: {type: Sequelize.STRING },
      taxCode: {type: Sequelize.STRING },
      field_of_activity: {type: Sequelize.STRING },
      staffSize: {type: Sequelize.STRING },
      address: {type: Sequelize.STRING },
      provinceCode: {type: Sequelize.STRING },
      description: {type: Sequelize.TEXT },

      
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
    await queryInterface.dropTable('Companies');
  }
};