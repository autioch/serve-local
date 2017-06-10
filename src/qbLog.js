/* eslint no-underscore-dangle: 0 */
const qbLog = require('qb-log');
const { OK, ERROR, NOT_FOUND } = require('./statuses');

qbLog({
  ok: {
    prefix: OK,
    formatter: qbLog._chalk.cyan
  },
  error: {
    prefix: ERROR,
    formatter: qbLog._chalk.red
  },
  notFound: {
    prefix: NOT_FOUND,
    formatter: qbLog._chalk.yellow
  },
  info: {
    prefix: 'INFO',
    formatter: qbLog._chalk.cyan
  }
});

module.exports = qbLog;
