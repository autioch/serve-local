const fs = require('fs');
const mime = require('mime');
const qbLog = require('./qbLog');
const sendError = require('./sendError');
const { OK, ERROR } = require('./statuses');

const CACHE_FOREVER = 'max-age=18000';

/**
 * Sends proper response for the request.
 * @param  {String} uri                   Requested resource.
 * @param  {http.ServerResponse} response Request response object.
 * @param  {Buffer} filename              Name of the file to send.
 * @return {undefined}                    Nothing.
 */
module.exports = function sendFile(uri, response, filename) {
  fs.readFile(filename, 'binary', (err, fileContents) => {
    if (err) {
      sendError(uri, response, ERROR, err.message);

      return;
    }

    const contentType = mime.lookup(filename);

    response.setHeader('content-type', contentType);

    if (contentType.includes('font')) {
      response.setHeader('cache-control', CACHE_FOREVER);
    }

    qbLog.ok(uri);

    response.writeHead(OK);
    response.write(fileContents, 'binary');
    response.end();
  });
};
