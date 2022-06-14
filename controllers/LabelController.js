const { UPSERT } = require('sequelize/types/query-types')
const { Label, Artist, Album } = require('../models')

const GetLabels = async (req, res) => {
  try {
    const labels = await Label.findAll({
      include: [
        {
          model: Artist
        },
        {
          model: Album
        }
      ]
    })
    res.send(labels)
  } catch (error) {
    throw error
  }
}

const GetLabel = async (req, res) => {
  try {
    let labelId = parseInt(req.params.label_id)
    const label = await Label.findByPk(labelId, {
      include: [
        {
          model: Artist
        },
        {
          model: Album
        }
      ]
    })
    res.send(label)
  } catch (error) {
    throw error
  }
}

const UpdateLabel = async (req, res) => {
  try {
    let labelId = parseInt(req.params.label_id)
    let updatedLabel = await Label.update(req.body, {
      where: { id: labelId },
      returning: true
    })
    res.send(updatedLabel)
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetLabels,
  GetLabel,
  UpdateLabel
}
