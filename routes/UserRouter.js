const Router = require('express').Router()
const controller = require('../controllers/UserController')
const middleware = require('../middleware')

Router.get('/', controller.GetUsers)
Router.get('/:user_id', controller.GetUser)
Router.put('/:user_id', controller.UpdateUser)

module.exports = Router
