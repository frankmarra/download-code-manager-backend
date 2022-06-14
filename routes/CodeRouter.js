const Router = require('express').Router()
const controller = require('../controllers/CodeController')

Router.put('/:code_id', controller.UpdateCode)

module.exports = Router
