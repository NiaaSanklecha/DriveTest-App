const Appointment = require("../models/Appointment");
module.exports = async function temp(req, res) {
  await Appointment.find().then((appointment) => {
    const appointments = appointment;
    console.log(appointments);
  });
};
