const Appointment = require("../../models/Appointment");
const User = require("../../models/DriveTest");

module.exports = async (req, res) => {
  console.log(req.body);
  const { date, time } = req.body;

  var formattedDate = new Date(date);

  console.log(formattedDate);
  await Appointment.create({
    date: formattedDate,
    time: time,
  });
  req.session.message = "Appointment Added.";
  res.redirect("/");
};
