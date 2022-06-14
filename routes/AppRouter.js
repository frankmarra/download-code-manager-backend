const Router = require('express').Router()
const LabelRouter = require('./LabelRouter')
const ArtistRouter = require('./ArtistRouter')
const AlbumRouter = require('./AlbumRouter')
const AuthRouter = require('./AuthRouter')
const middleware = require('../middleware')

Router.use(
  '/labels',
  LabelRouter,
  middleware.stripToken,
  middleware.verifyToken
)
Router.use('/labels/:label_id/artists', ArtistRouter)
Router.use('/labels/:label_id/artists/:artist_id/albums', AlbumRouter)
Router.use('/auth', AuthRouter)

module.exports = Router
