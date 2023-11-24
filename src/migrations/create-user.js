'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      name: {type: Sequelize.STRING },
      email: {type: Sequelize.STRING },
      password: {type: Sequelize.STRING },
      phone: {type: Sequelize.STRING },
      avatar: {type: Sequelize.STRING },
      birthYear: {type: Sequelize.STRING },
      gender: {type: Sequelize.STRING },
      profession: {type: Sequelize.STRING },
      experience: {type: Sequelize.STRING },
      qualification: {type: Sequelize.STRING },
      engLevel: {type: Sequelize.STRING },
      workLocation: {type: Sequelize.STRING },
      workForm: {type: Sequelize.STRING },
      desiredSalary: {type: Sequelize.STRING },
      homeTown: {type: Sequelize.STRING },
      wishes: {type: Sequelize.STRING },
      introduce: {type: Sequelize.STRING },
      role_code: {type: Sequelize.STRING, defaultValue:'R2'},
      refresh_token: {type: Sequelize.STRING },

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
    await queryInterface.dropTable('Users');
  }
};