const DriveTest = require("../../models/DriveTest");
const Appointment = require("../../models/Appointment");

var appointments = null;
var examiners = null;
module.exports = async function driveTest(req, res) {
  const drivetest = await DriveTest.findOne({ _id: req.session.userId }).then(
    async (driveTest) => {
      if (driveTest.licenseNumber === "default") {
        const driveTestResult = new DriveTest({
          firstName: "",
          lastName: "",
          age: 0,
          dob: "",
          licenseNumber: "",
          carDetails: {
            make: "",
            model: "",
            year: 0,
            plateNumber: "",
          },
        });

        res.render("G_Page", {
          driveTest: driveTestResult,
          appointments: null,
          errors: null,
          message: req.session.message,
        });
      } else {
        await Appointment.find().then((appointment) => {
          appointments = appointment;
          console.log(appointments);
        });
        res.render("G_Page", {
          driveTest,
          appointments: appointments,
          examiners: examiners,
          errors: null,
          message: null,
        });
      }
    }
  );
};
