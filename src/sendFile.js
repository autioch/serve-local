const mime = require('mime');
const qbLog = require('qb-log');
const { OK, ERROR } = require('./statuses');
const sendError = require('./sendError');
const fs = require('fs');

const CACHE_FOREVER = 'max-age=18000';

/**
 * Sends proper response for the request.
 * @param  {String} uri                   Requested resource.
 * @param  {http.ServerResponse} response Request response object.
 * @param  {Buffer} filename              Name of the file to send.
 * @return {undefined}                    Nothing.
 */
module.exports = function sendFile(uri, response, filename) {
  fs.readFile(filename, 'binary', (readError, fileContents) => {
    if (readError) {
      sendError(uri, response, ERROR);

      return;
    }

    qbLog.info(`${OK} ${uri}`);

    const contentType = mime.lookup(uri);

    response.setHeader('content-type', contentType);

    if (contentType.includes('font')) {
      response.setHeader('cache-control', CACHE_FOREVER);
    }

    response.writeHead(OK);
    response.write(fileContents, 'binary');
    response.end();
  });
};
