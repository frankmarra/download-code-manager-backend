const { Label, Artist, Album, Code } = require('../models')

const GetLabels = async (req, res) => {
  try {
    const labels = await Label.findAll({
      include: [
        {
          model: Artist
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
          model: Artist,
          include: [
            {
              model: Album,
              include: [
                {
                  model: Code
                }
              ]
            }
          ]
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

const CreateArtist = async (req, res) => {
  try {
    let labelId = parseInt(req.params.label_id)
    let newArtist = {
      labelId,
      ...req.body
    }
    let artist = await Artist.create(newArtist)
    res.send(artist)
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetLabels,
  GetLabel,
  UpdateLabel,
  CreateArtist
}
