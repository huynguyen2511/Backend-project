'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AppliedCvs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {type: Sequelize.STRING },
      userCvId: {type: Sequelize.STRING },
      employerId: {type: Sequelize.STRING },
      jobPostId: {type: Sequelize.STRING },
      status: {type: Sequelize.STRING, defaultValue:'Sent' },
      dateApply: {type: Sequelize.STRING },
      
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
    await queryInterface.dropTable('AppliedCvs');
  }
};