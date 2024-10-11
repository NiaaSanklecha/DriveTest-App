module.exports = (req, res) => {
  req.session.message = "You are logged out";
  req.session.destroy(() => {
    res.redirect("/");
  });
};
