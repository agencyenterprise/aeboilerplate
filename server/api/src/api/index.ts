import routes from './routes'

export default (app) => {
  app.use('/', routes)
}
