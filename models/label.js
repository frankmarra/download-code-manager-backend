'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Label extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Label.hasMany(models.Artist, { foreignKey: 'labelId' })
    }
  }
  Label.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      passwordDigest: {
        type: DataTypes.STRING,
        allowNull: false
      },
      url: DataTypes.STRING,
      logo: DataTypes.STRING,
      slug: DataTypes.STRING,
      redeemLink: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Label',
      tableName: 'labels'
    }
  )
  return Label
}
