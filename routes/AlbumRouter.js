const Router = require('express').Router()
const controller = require('../controllers/AlbumController')

// Router.post('/:artist_id', controller.CreateAlbum)
Router.put('/:album_id', controller.UpdateAlbum)
Router.delete('/:album_id', controller.DestroyAlbum)

module.exports = Router
