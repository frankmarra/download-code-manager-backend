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
    let { name, url } = req.body
    let labelId = parseInt(req.params.label_id)
    let slug = name.toLowerCase()
    slug = slug
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
    let newArtist = {
      labelId,
      name,
      url,
      slug
    }
    let artist = await Artist.create(newArtist)
    res.send(artist)
  } catch (error) {
    throw error
  }
}

const GetLabelArtists = async (req, res) => {
  try {
    let labelId = parseInt(req.params.label_id)
    let artists = await Artist.findAll({
      where: { labelId: labelId },
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
    })
    res.send(artists)
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetLabels,
  GetLabel,
  UpdateLabel,
  CreateArtist,
  GetLabelArtists
}
