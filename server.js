require('babel-register')

var env = process.env.NODE_ENV
env = JSON.stringify(env)

if (env === '"development"') {
  require('./server/server.dev.js')
} else if (env === '"production"') {
  require('./server/server.prod.js')
} else {
  console.log('----------------------------')
  console.log('| Set process.env.NODE_ENV |')
  console.log('----------------------------')
}
