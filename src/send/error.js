const qbLog = require('qb-log');

const CODE = 500;

/* Add custom logger. */
qbLog({
  error: {
    prefix: CODE,
    formatter: qbLog._chalk.red
  },
  errorDetails: {
    prefix: '',
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
  qbLog.error(uri);
  qbLog.error(message);

  response.writeHead(CODE, {
    'Content-Type': 'text/plain'
  });
  response.write(message);
  response.end();
};
