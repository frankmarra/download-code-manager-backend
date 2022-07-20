const Router = require('express').Router()
const controller = require('../controllers/CodeController')
const middleware = require('../middleware')

Router.put(
  '/:code_id',
  // middleware.stripToken,
  // middleware.verifyToken,
  controller.UpdateCode
)

module.exports = Router
