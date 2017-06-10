const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const { ok, notFound } = require('./send');

/**
 * Create an instance of http server with prepared handler.
 * @param  {String} documentRoot Directory in which files will be looked up.
 * @return {http.Server}         Instance of the HTTP server.
 */
module.exports = function createServer(documentRoot) {
  return http.createServer(function requestHandler(request, response) {
    const uri = url.parse(request.url).pathname;
    let filename = path.join(documentRoot, uri);

    fs.stat(filename, (fileError, stat) => {
      if (fileError) {
        notFound(uri, response, fileError.message);

        return;
      }

      if (stat.isFile()) {
        ok(uri, response, filename);

        return;
      }

      /* Resource must be adirectory. */
      filename = path.join(filename, 'index.html');

      fs.stat(filename, (indexError) => {
        if (indexError) {
          notFound(uri, response, indexError.message);

          return;
        }

        ok(uri, response, filename);
      });
    });
  });
};
