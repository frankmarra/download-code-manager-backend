const Router = require('express').Router()
const controller = require('../controllers/ArtistController')

Router.post('/:label_id', controller.CreateArtist)
Router.delete('/:artist_id', controller.DestroyArtist)

module.exports = Router
