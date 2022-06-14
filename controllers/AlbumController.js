const { Album } = require('../models')

const CreateAlbum = async (req, res) => {
  try {
    let artistId = parseInt(req.params.artist_id)
    let newAlbum = {
      artistId,
      ...req.body
    }
    let album = await Album.create(newAlbum)
    res.send(album)
  } catch (error) {
    throw error
  }
}

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

module.exports = {
  CreateAlbum,
  UpdateAlbum,
  DestroyAlbum
}
