const Router = require('express').Router()
const LabelRouter = require('./LabelRouter')
const ArtistRouter = require('./ArtistRouter')
const AlbumRouter = require('./AlbumRouter')
const AuthRouter = require('./AuthRouter')
const CodeRouter = require('./CodeRouter')
const UserRouter = require('./UserRouter')
const middleware = require('../middleware')

Router.use('/labels', LabelRouter)
Router.use('/labels/:label_id/artists', ArtistRouter)
Router.use('/labels/:label_id/artists/:artist_id/albums', AlbumRouter)
Router.use(
  '/labels/:label_id/artists/:artist_id/albums/:album_id/codes',
  CodeRouter
)
Router.use('/auth', AuthRouter)
Router.use('/users', UserRouter)

module.exports = Router
