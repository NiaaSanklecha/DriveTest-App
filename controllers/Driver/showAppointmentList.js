const Appointment = require("../../models/Appointment");
const User = require("../../models/DriveTest");

module.exports = async (req, res) => {
  console.log(req.session.userId);
  const appointmentId = await User.find({
    _id: req.session.userId,
  }).distinct("appointmentId");
  const user = await User.findOne({ _id: req.session.userId });
  const appointment = await Appointment.findOne({ _id: appointmentId });
  console.log(appointment);
  console.log(user);
  res.render("appointmentList", { appointment, user });
};
