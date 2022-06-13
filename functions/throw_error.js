function throwError(message, status) {
  const error = new Error(message);
  error.status = status;
  error.success = false;
  throw error;
}

module.exports = throwError;
