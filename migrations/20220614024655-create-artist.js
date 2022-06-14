'use strict'
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('artists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      artistName: {
        type: Sequelize.STRING
      },
      artistSite: {
        type: Sequelize.STRING
      },
      labelId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'labelId',
        onDelete: 'CASCADE',
        references: {
          model: 'labels',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('artists')
  }
}