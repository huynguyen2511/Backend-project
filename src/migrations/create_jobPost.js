'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('JobPosts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {type: Sequelize.STRING },
      salary: {type: Sequelize.STRING },
      provinceCode: {type: Sequelize.STRING },
      address: {type: Sequelize.STRING },
      employerId: {type: Sequelize.STRING },
      benefits: {type: Sequelize.TEXT },
      requirements: {type: Sequelize.TEXT },
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
    await queryInterface.dropTable('JobPosts');
  }
};