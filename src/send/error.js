const qbLog = require('qb-log');

const CODE = 500;

/* Add custom logger. */
qbLog({
  serveError: {
    prefix: CODE,
    formatter: qbLog._chalk.red
  }
});

/**
 * Sends an error response.
 * @param  {String} uri                   Requested resource.
 * @param  {http.ServerResponse} response Request response object.
 * @param  {String} message               Error message.
 * @return {undefined}                    Nothing.
 */
module.exports = function sendError(uri, response, message) {
  qbLog.serveError(uri);
  qbLog.serveError(message);

  response.writeHead(CODE, {
    'Content-Type': 'text/plain'
  });
  response.write(message);
  response.end();
};
