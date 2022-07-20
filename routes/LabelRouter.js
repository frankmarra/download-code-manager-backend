const Router = require('express').Router()
const controller = require('../controllers/LabelController')
const middleware = require('../middleware')

Router.get('/', controller.GetLabels)
Router.post(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateLabel
)
Router.get('/:label_slug', controller.GetLabel)
Router.get('/:label_id/active', controller.GetActiveArtists)
Router.post(
  '/:label_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateArtist
)
Router.put(
  '/:label_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdateLabel
)
Router.get('/:label_id/artists', controller.GetLabelArtists)
Router.delete(
  '/:label_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DestroyLabel
)

module.exports = Router
