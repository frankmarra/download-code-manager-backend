const Router = require('express').Router()
const controller = require('../controllers/AlbumController')

Router.get('/:album_id', controller.GetAllAlbumCodes)
Router.get('/:album_id/codes/unused', controller.GetAllUnusedAlbumCodes)
Router.get('/:album_id/codes/used', controller.GetAllUsedAlbumCodes)
Router.post('/:album_id', controller.CreateCode)
Router.post('/:album_id/bulk-create', controller.CreateMultipleCodes)
Router.put('/:album_id', controller.UpdateAlbum)
Router.delete('/:album_id', controller.DestroyAlbum)

module.exports = Router
