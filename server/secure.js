const fs = require('fs')
const https = require('https');
const config = require('../config')

const createSecureServer = (app) => {
  const sslOptions = {
    key: fs.readFileSync('./ssl/server.key'),
    cert: fs.readFileSync('./ssl/server.crt')
  }

  const { PORT } = config;

  return https.createServer(sslOptions, app).listen(PORT, function() {
    console.log('Up server listening on port: ', PORT);
    console.log('environment: ', app.get('env'))
  }) 
}

module.exports = createSecureServer
