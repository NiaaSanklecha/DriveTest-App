module.exports = (req, res) => {
  console.log(req.session);
  res.render("dashboard", { message: req.session.message });
};
