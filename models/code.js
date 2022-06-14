'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Code extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Code.belongsTo(models.Album, {
        as: 'code',
        foreignKey: 'albumId'
      })
    }
  }
  Code.init(
    {
      albumCode: DataTypes.STRING,
      used: DataTypes.BOOLEAN,
      albumId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'albumId',
        onDelete: 'CASCADE',
        references: {
          model: 'albums',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'Code'
    }
  )
  return Code
}
