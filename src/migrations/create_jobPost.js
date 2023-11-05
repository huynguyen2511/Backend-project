'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('JobPosts', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      title: {type: Sequelize.STRING },
      attributesId: {type: Sequelize.STRING },
      provinceCode: {type: Sequelize.STRING },
      address: {type: Sequelize.STRING },
      employerId: {type: Sequelize.STRING },
      companyId: {type: Sequelize.STRING },
      labelCode: {type: Sequelize.STRING },
      categoryCode: {type: Sequelize.STRING },
      overviewId: {type: Sequelize.STRING },
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