import express from 'express'
import path from 'path'
import GraphQLHTTP from 'express-graphql'
import schema from '../graphql/schema'

const APP_PORT = 3000

let app = express()

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
