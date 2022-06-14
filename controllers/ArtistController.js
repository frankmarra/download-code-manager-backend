const { Artist, Album } = require('../models')

// const CreateArtist = async (req, res) => {
//   try {
//     let labelId = parseInt(req.params.label_id)
//     let newArtist = {
//       labelId,
//       ...req.body
//     }
//     let artist = await Artist.create(newArtist)
//     res.send(artist)
//   } catch (error) {
//     throw error
//   }
// }

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
