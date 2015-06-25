var fs = require('fs')

module.exports = function readFromEnvOrFile(env, path, callback) {
  if (!env && !path) {
    return callback()
  }

  if (env) {
    return callback(null, env)
  }

  fs.readFile(path, 'utf8', callback)
}
