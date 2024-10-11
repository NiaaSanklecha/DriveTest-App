const User = require("../../models/DriveTest");
const Appointment = require("../../models/Appointment");
module.exports = async (req, res) => {
  const { filterType } = req.params;
  const dateToday = new Date();
  var formattedDate = dateToday.toISOString();
  var formattedTime = dateToday.getHours() + ":" + dateToday.getMinutes();
  console.log(formattedTime);
  const bookedAppointment = await Appointment.find({
    examiner: req.session.userId,
  }).sort({ date: 1 });
  // console.log(bookedAppointment);
  const user = [];
  if (filterType === "G2" || filterType === "G") {
    for (let i = 0; i < bookedAppointment.length; i++) {
      user.push(
        await User.findOne({
          appointmentId: bookedAppointment[i]._id,
          testType: filterType,
        })
      );
    }
    console.log(filterType);
    console.log(user);
  } else {
    for (let i = 0; i < bookedAppointment.length; i++) {
      user.push(
        await User.findOne({
          appointmentId: bookedAppointment[i]._id,
        })
      );
    }
    // console.log(user);
  }

  res.render("examinerCurrentAppointment", {
    bookedAppointment,
    user,
    filteredBy: filterType,
    formattedDate,
    formattedTime,
  });
};
