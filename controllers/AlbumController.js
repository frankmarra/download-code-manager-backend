const { Album, Code } = require('../models')

const UpdateAlbum = async (req, res) => {
  try {
    let albumId = parseInt(req.params.album_id)
    let updatedAlbum = await Album.update(req.body, {
      where: { id: albumId },
      returning: true
    })
    res.send(updatedAlbum)
  } catch (error) {
    throw error
  }
}

const DestroyAlbum = async (req, res) => {
  try {
    let albumId = parseInt(req.params.album_id)
    await Album.destroy({ where: { id: albumId } })
    res.send({ message: `Album with id of ${albumId} has been removed.` })
  } catch (error) {
    throw error
  }
}

const CreateCode = async (req, res) => {
  try {
    let albumId = parseInt(req.params.album_id)
    let newCode = {
      albumId,
      used: false,
      ...req.body
    }
    let code = await Code.create(newCode)
    res.send(code)
  } catch (error) {
    throw error
  }
}

module.exports = {
  UpdateAlbum,
  DestroyAlbum,
  CreateCode
}
