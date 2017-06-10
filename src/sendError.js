const qbLog = require('qb-log');

const TEXT_CONTENT = Object.freeze({
  'Content-Type': 'text/plain'
});

/**
 * Sends an error response.
 * @param  {String} uri                   Requested resource.
 * @param  {http.ServerResponse} response Request response object.
 * @param  {Number} code                  Error code.
 * @return {undefined}                    Nothing.
 */
module.exports = function sendError(uri, response, code) {
  qbLog.error(`${code} ${uri}`);

  response.writeHead(code, TEXT_CONTENT);
  response.end();
};
