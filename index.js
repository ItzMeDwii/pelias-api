const logger = require('pelias-logger').get('api');
const type_mapping = require('./helper/type_mapping');
const https = require('https');
const fs = require('fs');

const app = require('./app'),
  port = (process.env.PORT || 3100),
  host = (process.env.HOST || '0.0.0.0');

var privateKey = fs.readFileSync('ssl.key', 'utf8');
var certificate = fs.readFileSync('ssl.crt', 'utf8');

var credentials = { key: privateKey, cert: certificate };

let server;

// load Elasticsearch type mappings before starting web server
type_mapping.load(() => {
  var httpsServer = https.createServer(credentials, app)
  server = httpsServer.listen(port, host, () => {
    // ask server for the actual address and port its listening on
    const listenAddress = server.address();
    logger.info(`pelias is now running on http://${listenAddress.address}:${listenAddress.port}`);
  });
});

function exitHandler() {
  logger.info('Pelias API shutting down');

  server.close();
}

process.on('SIGINT', exitHandler);
process.on('SIGTERM', exitHandler);
