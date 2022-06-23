const { Artist, Album } = require('../models')

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

const DestroyArtist = async (req, res) => {
  try {
    let artistId = parseInt(req.params.artist_id)
    await Artist.destroy({ where: { id: artistId } })
    res.send({ message: `Artist with id of ${artistId} has been removed` })
  } catch (error) {
    throw error
  }
}

module.exports = {
  CreateAlbum,
  DestroyArtist
}
