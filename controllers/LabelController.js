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
    let labelSlug = req.params.label_slug
    const label = await Label.findOne({
      where: { slug: labelSlug },

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

const CreateLabel = async (req, res) => {
  try {
    let { email, name } = req.body
    email = email.toLowerCase()
    let slug = name.toLowerCase()
    slug = slug
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
    const label = await Label.create({
      email,
      name,
      slug
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
    let { name, url, email, logo, redeemLink, labelId } = req.body
    let slug = name.toLowerCase()
    slug = slug
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
    let newArtist = {
      labelId,
      name,
      url,
      email,
      logo,
      redeemLink,
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

const GetActiveArtists = async (req, res) => {
  try {
    let labelId = parseInt(req.params.label_id)
    let artists = await Artist.findAll({
      where: { labelId: labelId, isActive: true }
    })
    res.send(artists)
  } catch (error) {
    throw error
  }
}

const DestroyLabel = async (req, res) => {
  try {
    let labelId = parseInt(req.params.label_id)
    await Label.destroy({ where: { id: labelId } })
    res.send({ message: `Label with id of ${labelId} has been removed` })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetLabels,
  GetLabel,
  GetActiveArtists,
  UpdateLabel,
  CreateArtist,
  GetLabelArtists,
  CreateLabel,
  DestroyLabel
}
