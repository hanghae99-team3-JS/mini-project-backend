const logger = require('../functions/winston');

function throwError(message, status) {
  logger.error(message);

  const error = new Error(message);

  error.status = status;
  error.success = false;

  throw error;
}

module.exports = throwError;
