const logger = require('../functions/winston');

function throwError(message, status) {
  logger.info(`${nickname} - 프로필 확인`);

  const error = new Error(message);

  error.status = status;
  error.success = false;

  throw error;
}

module.exports = throwError;
