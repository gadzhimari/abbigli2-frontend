export default (err, logger) => {
  if (err.status && status >= 500) {
    logger.error(err.response.data);
  }

  if (!err.status) {
    logger.error(err);
  }
};
