const bcrypt = require("bcrypt");
const User = require("../models/DriveTest");

module.exports = (req, res) => {
  const { userName, password } = req.body;
  if (userName && password) {
    User.findOne({ userName: userName }).then((user) => {
      if (user) {
        console.log(user);
        bcrypt.compare(password, user.password, (error, same) => {
          if (same) {
            // if passwords match
            // store user session, will talk about it later
            req.session.userId = user._id;
            req.session.userType = user.role;
            req.session.message = "You are logged in as " + user.role;
            console.log(req.session);
            res.redirect("/");
          } else {
            res.redirect("/signup");
          }
        });
      } else if (user === "null") {
        req.session.message = "Please first signup";
        res.redirect("/signup");
      } else {
        req.session.message = "Please first signup";
        res.redirect("/signup");
      }
    });
  } else {
    req.flash("validationErrors", "Please provide username or password");
    return res.render("login", {
      //errors: req.session.validationErrors
      errors: req.flash("validationErrors"),
    });
  }
};
