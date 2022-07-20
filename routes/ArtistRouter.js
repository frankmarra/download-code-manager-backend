const Router = require('express').Router()
const controller = require('../controllers/ArtistController')
const middleware = require('../middleware')

Router.get('/:artist_id', controller.GetArtist)
Router.get('/:artist_id/active', controller.GetActiveAlbums)
Router.get('/:artist_id/codes', controller.GetAllArtistCodes)
Router.put(
  '/:artist_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdateArtist
)
Router.post(
  '/:artist_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateAlbum
)
Router.delete(
  '/:artist_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DestroyArtist
)

module.exports = Router
