const Router = require('express').Router()
const controller = require('../controllers/LabelController')
const middleware = require('../middleware')

Router.get('/', controller.GetLabels)
Router.get('/:label_id', controller.GetLabel)
Router.put('/:label_id', controller.UpdateLabel)

module.exports = Router
