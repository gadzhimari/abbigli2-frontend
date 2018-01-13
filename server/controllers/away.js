export default (req, res) => {
  const { query } = req;

  res.redirect(301, query.to);
};
