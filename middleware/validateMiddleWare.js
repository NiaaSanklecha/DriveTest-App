const DriveTest = require("../models/DriveTest");

module.exports = async (req, res, next) => {
  const licenseNumber = await DriveTest.find({
    licenseNumber: req.body.licenseNumber,
  }).distinct("licenseNumber");
  console.log(licenseNumber);
  if (
    req.body.licenseNumber === "" ||
    req.body.firstName === "" ||
    req.body.lastName === "" ||
    req.body.dob === "" ||
    req.body.age === 0
  ) {
    req.flash("validationErrors", "Please fill out necessary details");
  } else {
    if (req.body.licenseNumber.length !== 10) {
      req.flash(
        "validationErrors",
        "License Number should be 10 characters long"
      );
      if (
        licenseNumber &&
        licenseNumber[0] !== "default" &&
        licenseNumber.length > 0
      ) {
        req.flash("validationErrors", "License Number already exists");
      }
    }

    if (req.body.age > 65 || req.body.age < 18) {
      req.flash("validationErrors", "Age should be between 18 and 65.");
    }
  }
  if (req.flash("ValidationErrors").length > 0) {
    req.session.message = req.flash("validationErrors");
    console.log(req.session.message);
    if (req.body.testType === "G2") {
      return res.redirect("/g2_test");
    } else {
      return res.redirect("/g_test");
    }
  } else {
    next();
  }
};
