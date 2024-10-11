const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
  date: {
    type: Date,
    required: true,
    unique: false,
  },
  time: {
    type: String,
    required: true,
  },
  isTimeSlotAvailable: {
    type: Boolean,
    default: true,
    unique: false,
  },
  examiner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DriveTest",
  },
  datePosted: {
    type: Date,
    default: new Date(),
  },
});
const Appointment = mongoose.model("Appointment", AppointmentSchema);
module.exports = Appointment;
