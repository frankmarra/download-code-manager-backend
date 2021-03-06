const { Album, Code } = require('../models')

const GetAlbum = async (req, res) => {
  try {
    let albumId = parseInt(req.params.album_id)
    const album = await Album.findByPk(albumId, {
      include: [
        {
          model: Code
        }
      ]
    })
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

const CreateMultipleCodes = async (req, res) => {
  try {
    let codes = await Code.bulkCreate(req.body)
    res.send(codes)
  } catch (error) {
    throw error
  }
}

const GetAllAlbumCodes = async (req, res) => {
  try {
    let albumId = parseInt(req.params.album_id)
    const albumCodes = await Code.findAll({
      where: { albumId: albumId },
      order: [['id', 'ASC']]
    })
    const usedTotal = await Code.count({
      where: {
        used: true,
        albumId: albumId
      }
    })
    const unusedTotal = await Code.count({
      where: {
        used: false,
        albumId: albumId
      }
    })
    res.json({ albumCodes, usedTotal, unusedTotal })
  } catch (error) {
    throw error
  }
}

const GetAllUnusedAlbumCodes = async (req, res) => {
  try {
    let albumId = parseInt(req.params.album_id)
    const albumCodes = await Code.findAll({
      where: { albumId: albumId, used: false }
    })
    res.send(albumCodes)
  } catch (error) {
    throw error
  }
}

const GetAllUsedAlbumCodes = async (req, res) => {
  try {
    let albumId = parseInt(req.params.album_id)
    const albumCodes = await Code.findAll({
      where: { albumId: albumId, used: true }
    })
    res.send(albumCodes)
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetAlbum,

  UpdateAlbum,
  DestroyAlbum,
  CreateCode,
  CreateMultipleCodes,
  GetAllAlbumCodes,
  GetAllUnusedAlbumCodes,
  GetAllUsedAlbumCodes
}
