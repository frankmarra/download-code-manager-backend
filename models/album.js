'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Album.belongsTo(models.Artist, {
        as: 'album',
        foreignKey: 'artistId'
      })
    }
  }
  Album.init(
    {
      albumName: DataTypes.STRING,
      albumCodes: DataTypes.ARRAY(DataTypes.STRING),
      artistId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'artistId',
        onDelete: 'CASCADE',
        references: {
          model: 'artists',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'Album',
      tableName: 'albums'
    }
  )
  return Album
}
