const Router = require('express').Router()
const controller = require('../controllers/AlbumController')
const middleware = require('../middleware')

Router.get('/:album_id', controller.GetAlbum)

Router.get('/:album_id/codes', controller.GetAllAlbumCodes)
Router.get('/:album_id/codes/unused', controller.GetAllUnusedAlbumCodes)
Router.get('/:album_id/codes/used', controller.GetAllUsedAlbumCodes)
Router.post(
  '/:album_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateCode
)
Router.post(
  '/:album_id/create-codes',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateMultipleCodes
)
Router.put(
  '/:album_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdateAlbum
)
Router.delete(
  '/:album_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DestroyAlbum
)

module.exports = Router
