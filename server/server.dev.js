import express from 'express'
import path from 'path'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import webpackConfig from '../webpack.config.js'
import GraphQLHTTP from 'express-graphql'
import schema from '../graphql/schema'

const APP_PORT = 3000

var compiler = webpack(webpackConfig)

var app = new WebpackDevServer(compiler, {
  contentBase: '/public/',
  stats: {
    chunks: false,
    colors: true,
  }
});

app.use('/', express.static(path.resolve(__dirname, '..', 'public')))
app.use('/graphql', GraphQLHTTP((req) => {
  return {
    schema: schema,
    graphiql: true
  }
}))
app.listen(APP_PORT, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log(`GraphQL is serving at http://localhost:${APP_PORT}`)
    console.log(`App is running at http://localhost:${APP_PORT}`)
  }
})
