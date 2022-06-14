const Router = require('express').Router()
const controller = require('../controllers/ArtistController')

// Router.post('/:label_id', controller.CreateArtist)
Router.post('/:artist_id', controller.CreateAlbum)
Router.delete('/:artist_id', controller.DestroyArtist)

module.exports = Router
