const DriveTest = require("../../models/DriveTest");

module.exports = async (req, res) => {
  console.log(req.body);
  if (req.body.testResult === "Pass") {
    await DriveTest.findOneAndUpdate(
      { _id: req.body.id },
      {
        testResult: req.body.testResult,
        comment: req.body.comment,
        licenseStatus: "G2",
      }
    );
  } else {
    await DriveTest.findOneAndUpdate(
      { _id: req.body.id },
      { testResult: req.body.testResult, comment: req.body.comment }
    );
  }
  req.session.message = "Result Updated.";
  res.redirect("/");
};
