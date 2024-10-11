const DriveTest = require("../../models/DriveTest");
const Appointment = require("../../models/Appointment");
module.exports = async (req, res) => {
  console.log("Enter");
  console.log(req.body);

  await DriveTest.findOneAndUpdate(
    { _id: req.session.userId },
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      dob: req.body.dob,
      licenseNumber: req.body.licenseNumber,
      appointmentId: req.body.appointmentId,
      testType: req.body.testType,
      "carDetails.make": req.body.make,
      "carDetails.model": req.body.model,
      "carDetails.year": req.body.year,
      "carDetails.plateNumber": req.body.plateNumber,
    }
  );
  req.session.message = "Details Updated.";
  if (req.body.appointmentId !== null) {
    await Appointment.findOneAndUpdate(
      {
        _id: req.body.appointmentId,
      },
      {
        isTimeSlotAvailable: false,
      }
    );
    req.session.message = "Details Updated.";
  }

  res.redirect("/");
};
