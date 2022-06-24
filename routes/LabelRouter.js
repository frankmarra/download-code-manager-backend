const Router = require('express').Router()
const controller = require('../controllers/LabelController')
const middleware = require('../middleware')

Router.get('/', controller.GetLabels)
Router.post('/', controller.CreateLabel)
Router.get('/:label_id', controller.GetLabel)
Router.post('/:label_id', controller.CreateArtist)
Router.put('/:label_id', controller.UpdateLabel)
Router.get('/:label_id/artists', controller.GetLabelArtists)

module.exports = Router
