function errorMiddleware(err, req, res, next) {
  if (!err) {
    return res.status(404).send('요청하신 페이지를 찾을 수 없습니다.');
  }

  const { status, message } = err;

  res.status(status || 400).json({ success: false, message });
}

module.exports = errorMiddleware;
