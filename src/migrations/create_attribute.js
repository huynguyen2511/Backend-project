'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Attributes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      salary: {type: Sequelize.STRING },
      benefits: {type: Sequelize.TEXT },
      requirements: {type: Sequelize.TEXT },
      experience: {type: Sequelize.STRING },
      level: {type: Sequelize.STRING },
      recruitNumber: {type: Sequelize.STRING },
      published: {type: Sequelize.STRING },
      hashtag: {type: Sequelize.STRING },
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
    await queryInterface.dropTable('Attributes');
  }
};