var env = process.env.NODE_ENV
env = JSON.stringify(env)

if (env === '"development"') {
  module.exports = require('./webpack/webpack.config.dev.js')(env)
} else if (env === '"production"') {
  module.exports = require('./webpack/webpack.config.prod.js')(env)
} else {
  console.log('----------------------------')
  console.log('| Set process.env.NODE_ENV |')
  console.log('----------------------------')
}
