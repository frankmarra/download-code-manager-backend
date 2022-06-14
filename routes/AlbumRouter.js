const Router = require('express').Router()
const controller = require('../controllers/AlbumController')

Router.post('/:album_id', controller.CreateCode)
Router.put('/:album_id', controller.UpdateAlbum)
Router.delete('/:album_id', controller.DestroyAlbum)

module.exports = Router
