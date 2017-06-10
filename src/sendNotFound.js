const qbLog = require('./qbLog');

/**
 * Sends an error response.
 * @param  {String} uri                   Requested resource.
 * @param  {http.ServerResponse} response Request response object.
 * @param  {Number} code                  Error code.
 * @param  {String} message               Error message.
 * @return {undefined}                    Nothing.
 */
module.exports = function sendNotFound(uri, response, code, message) {
  qbLog.notFound(uri);
  qbLog.notFound(message);

  response.writeHead(code, {
    'Content-Type': 'text/plain'
  });
  response.write(message);
  response.end();
};
