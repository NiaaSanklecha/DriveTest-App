const DriveTest = require("../models/DriveTest");

module.exports = async (req, res) => {
  if (req.body.password != req.body.repeatPassword) {
    req.flash("validationErrors", "Passwords doesn't match");
    return res.render("signup", {
      //errors: req.session.validationErrors
      errors: req.flash("validationErrors"),
    });
  }
  try {
    await DriveTest.create(req.body);
    req.session.message = "Successfully signed up.";
    res.redirect("/login");
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      req.flash("validationErrors", validationErrors);
      req.flash("data", req.body);
      // req.session.validationErrors = validationErrors;
      console.log(error);
      var username = "";
      var password = "";
      const data = req.flash("data")[0];
      if (typeof data != "undefined") {
        username = data.username;
        password = data.password;
      }

      return res.render("signup", {
        //errors: req.session.validationErrors
        errors: req.flash("validationErrors"),
        userName: username,
        password: password,
      });
      // return res.redirect("/auth/register");
    } else {
      // Handle other types of errors (e.g., database connection issues)
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
  }
};
