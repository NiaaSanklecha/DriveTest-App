const User = require("../../models/DriveTest");
const Appointment = require("../../models/Appointment");
module.exports = async (req, res) => {
  const { filterType } = req.params;
  var user = null;
  if (filterType === "G2" || filterType === "G") {
    user = await User.find({
      testType: filterType,
      examinerAlloted: { $exists: false },
      appointmentId: { $ne: null },
    });
    console.log(filterType);
    console.log(user);
  } else {
    user = await User.find({
      examinerAlloted: { $exists: false },
      appointmentId: { $ne: null },
    });
    console.log("G2");
    console.log(user);
  }

  const bookedAppointment = [];
  for (let i = 0; i < user.length; i++) {
    console.log(user[i].appointmentId);
    bookedAppointment.push(
      await Appointment.findOne({ _id: user[i].appointmentId })
    );
  }
  res.render("examinerShowBookedAppointment", {
    bookedAppointment,
    user,
    filteredBy: filterType,
  });
  console.log(bookedAppointment);
};
