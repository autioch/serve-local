const fs = require('fs');
const mime = require('mime');
const qbLog = require('qb-log');
const sendError = require('./error');

const CODE = 200;

/* Add custom logger. */
qbLog({
  ok: {
    prefix: CODE,
    formatter: qbLog._chalk.cyan
  }
});

/**
 * Sends proper response for the request.
 * @param  {String} uri                   Requested resource.
 * @param  {http.ServerResponse} response Request response object.
 * @param  {Buffer} filename              Name of the file to send.
 * @return {undefined}                    Nothing.
 */
module.exports = function sendOk(uri, response, filename) {
  fs.readFile(filename, 'binary', (err, fileContents) => {
    if (err) {
      sendError(uri, response, err.message);

      return;
    }

    const contentType = mime.lookup(filename);

    response.setHeader('content-type', contentType);

    if (contentType.includes('font')) {
      response.setHeader('cache-control', 'max-age=18000');
    }

    qbLog.ok(uri);

    response.writeHead(CODE);
    response.write(fileContents, 'binary');
    response.end();
  });
};
