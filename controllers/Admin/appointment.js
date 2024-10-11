const Appointment = require("../../models/Appointment");

module.exports = async (req, res) => {
  const { date } = req.params;
  console.log(date);
  const dateToSearch = new Date(date).toLocaleString();
  console.log(dateToSearch);
  var minDate = new Date();
  minDate = new Date(minDate.setDate(minDate.getDate() - 1))
    .toISOString()
    .split("T")[0];
  if (date !== null && date !== undefined) {
    const timeSlots = await Appointment.distinct("time", {
      date: dateToSearch,
    });
    console.log("timeslots" + timeSlots);
    const timeArray = [
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "12:30",
      "13:00",
      "13:30",
    ];
    for (let i = 0; i < timeSlots.length; i++) {
      for (let j = 0; j < timeArray.length; j++) {
        if (timeSlots[i] == timeArray[j]) {
          timeArray.splice(j, 1);
        }
      }
    }

    console.log(timeArray);
    res.render("appointment", {
      timeArray,
      date,
      minDate,
      message: "Appointment Added.",
    });
  } else {
    res.render("appointment", {
      timeArray: null,
      date: "",
      minDate,
      message: "Appointment Added.",
    });
  }
};
