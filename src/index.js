const qbLog = require('./qbLog');
const createServer = require('./createServer');

/**
 * Creates and sets up server instance.
 * @param  {String} documentRoot Directory in which files will be looked up.
 * @param  {Number} port         At which port server will listen.
 * @return {Promise}             Promise resolving and rejecting to server instance.
 */
module.exports = function serveLocal(documentRoot, port) {
  const server = createServer(documentRoot);

  return new Promise((resolve, reject) => {
    server.listen(port, (err) => {
      if (err) {
        qbLog.error(err.message);
        reject(server);

        return;
      }

      qbLog.info(`Localhost listening on: http://localhost:${port}`);
      resolve(server);
    });
  });
};
