const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const sendFile = require('./sendFile');
const sendNotFound = require('./sendNotFound');
const { NOT_FOUND } = require('./statuses');

/**
 * [createServer description]
 * @param  {String} documentRoot Directory in which files will be looked up.
 * @return {http.Server}         Instance of the HTTP server.
 */
module.exports = function createServer(documentRoot) {
  return http.createServer(function requestHandler(request, response) {
    const uri = url.parse(request.url).pathname;
    let filename = path.join(documentRoot, uri);

    fs.stat(filename, (fileError, stat) => {
      if (fileError) {
        sendNotFound(uri, response, NOT_FOUND, fileError.message);

        return;
      }

      if (stat.isFile()) {
        sendFile(uri, response, filename);

        return;
      }

      /* Resource must be adirectory. */
      filename = path.join(filename, 'index.html');

      fs.stat(filename, (indexError) => {
        if (indexError) {
          sendNotFound(uri, response, NOT_FOUND, indexError.message);
        } else {
          sendFile(uri, response, filename);
        }
      });
    });
  });
};
