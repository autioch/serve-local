const qbLog = require('qb-log');

const CODE = 404;

/* Add custom logger. */
qbLog({
  serveNotFound: {
    prefix: CODE,
    formatter: qbLog._chalk.yellow
  }
});

/**
 * Sends an error response.
 * @param  {String} uri                   Requested resource.
 * @param  {http.ServerResponse} response Request response object.
 * @param  {String} message               Error message.
 * @return {undefined}                    Nothing.
 */
module.exports = function sendNotFound(uri, response, message) {
  qbLog.serveNotFound(uri);

  response.writeHead(CODE, {
    'Content-Type': 'text/plain'
  });
  response.write(message);
  response.end();
};
