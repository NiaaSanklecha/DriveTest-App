const DriveTest = require("../../models/DriveTest");

module.exports = async (req, res) => {
  console.log(req.body);

  await DriveTest.findOneAndUpdate(
    { _id: req.body.id },
    {
      appointmentId: null,
      examinerAlloted: "",
      testResult: "",
      comment: "",
    }
  );

  req.session.message = "Details Updated.";
  res.redirect("/");
};
