const { Artist, Album, Code } = require('../models')

const GetArtist = async (req, res) => {
  try {
    let artistId = parseInt(req.params.artist_id)
    const artist = await Artist.findByPk(artistId, {
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
    res.send(artist)
  } catch (error) {
    throw error
  }
}
const CreateAlbum = async (req, res) => {
  try {
    let { name } = req.body
    let artistId = parseInt(req.params.artist_id)
    let slug = name.toLowerCase()
    slug = slug
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
    let newAlbum = {
      artistId,
      name,
      slug
    }
    let album = await Album.create(newAlbum)
    res.send(album)
  } catch (error) {
    throw error
  }
}

const UpdateArtist = async (req, res) => {
  try {
    let artistId = parseInt(req.params.artist_id)
    let updatedArtist = await Artist.update(req.body, {
      where: { id: artistId },
      returning: true
    })
    res.send(updatedArtist)
  } catch (error) {
    throw error
  }
}

const DestroyArtist = async (req, res) => {
  try {
    let artistId = parseInt(req.params.artist_id)
    await Artist.destroy({ where: { id: artistId } })
    res.send({ message: `Artist with id of ${artistId} has been removed` })
  } catch (error) {
    throw error
  }
}

const GetActiveAlbums = async (req, res) => {
  try {
    artistId = parseInt(req.params.artist_id)
    const activeAlbums = await Album.findAll({
      where: { artistId: artistId, isActive: true }
    })
    res.send(activeAlbums)
  } catch (error) {
    throw error
  }
}

const GetAllArtistCodes = async (req, res) => {
  try {
    let artistId = parseInt(req.params.artist_id)
    const artistCodes = await Code.findAll({
      where: { artistId: artistId },
      order: [['id', 'ASC']]
    })
    const usedTotal = await Code.count({
      where: {
        used: true,
        artistId: artistId
      }
    })
    const unusedTotal = await Code.count({
      where: {
        used: false,
        artistId: artistId
      }
    })
    res.json({ artistCodes, usedTotal, unusedTotal })
  } catch (error) {
    throw error
  }
}

module.exports = {
  CreateAlbum,
  DestroyArtist,
  GetActiveAlbums,
  GetAllArtistCodes,
  UpdateArtist,
  GetArtist
}
