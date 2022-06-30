const Router = require('express').Router()
const controller = require('../controllers/ArtistController')

Router.get('/:artist_id', controller.GetArtist)
Router.get('/:artist_id/codes', controller.GetAllArtistCodes)
Router.put('/:artist_id', controller.UpdateArtist)
Router.post('/:artist_id', controller.CreateAlbum)
Router.delete('/:artist_id', controller.DestroyArtist)

module.exports = Router
