const qbLog = require('qb-log');
const createServer = require('./createServer');

/* Add custom logger. */
qbLog({
  fatal: {
    prefix: 'FATAL',
    formatter: qbLog._chalk.bgRed
  },
  info: {
    prefix: 'INFO',
    formatter: qbLog._chalk.cyan
  }
});

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
        qbLog.fatal(err.message);
        reject(server);

        return;
      }

      qbLog.info(`Localhost listening on: http://localhost:${port}`);
      resolve(server);
    });
  });
};
