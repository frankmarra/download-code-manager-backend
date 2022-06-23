'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Artist.belongsTo(models.Label, {
        as: 'artist',
        foreignKey: 'labelId'
      })
      Artist.hasMany(models.Album, { foreignKey: 'artistId' })
    }
  }
  Artist.init(
    {
      name: DataTypes.STRING,
      url: DataTypes.STRING,
      slug: DataTypes.STRING,
      labelId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'labelId',
        onDelete: 'CASCADE',
        references: {
          model: 'labels',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'Artist',
      tableName: 'artists'
    }
  )
  return Artist
}
