const Appointment = require("../../models/Appointment");
const User = require("../../models/DriveTest");

module.exports = async (req, res) => {
  await Appointment.findOneAndUpdate(
    { _id: req.body.appointmentId },
    { examiner: req.session.userId }
  );
  const userName = await User.findOne({ _id: req.session.userId }).distinct(
    "userName"
  );
  console.log(userName);
  await User.findOneAndUpdate(
    { appointmentId: req.body.appointmentId },
    { examinerAlloted: userName[0] }
  );

  res.redirect("/currentAppointment");
};
