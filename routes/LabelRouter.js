const Router = require('express').Router()
const controller = require('../controllers/LabelController')
const middleware = require('../middleware')

Router.get('/', controller.GetLabels)
Router.post('/', controller.CreateLabel)
Router.get('/:label_id', controller.GetLabel)
Router.get('/:label_id/active', controller.GetActiveArtists)
Router.post('/:label_id', controller.CreateArtist)
Router.put('/:label_id', controller.UpdateLabel)
Router.get('/:label_id/artists', controller.GetLabelArtists)
Router.delete('/:label_id', controller.DestroyLabel)

module.exports = Router
