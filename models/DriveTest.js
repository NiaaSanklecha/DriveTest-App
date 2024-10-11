const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const DriveTestSchema = new Schema({
  firstName: {
    type: String,
    default: "default",
    required: [true, "Firstname is required"],
  },
  lastName: {
    type: String,
    default: "default",
    required: [true, "Lastname is required"],
  },
  age: {
    type: Number,
    default: 0,
    required: [true, "Age is required"],
  },
  dob: {
    type: String,
    default: "default",
    required: [true, "Date of Birth is required"],
  },
  licenseNumber: {
    type: String,
    default: "default",
    required: [true, "License Number is required"],
  },
  userName: {
    type: String,
    required: [true, "Please provide username"],
    unique: [true, "Username exists"],
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
  },
  role: String,
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    default: null,
  },
  carDetails: {
    make: {
      type: String,
      default: "default",
    },
    model: {
      type: String,
      default: "default",
    },
    year: {
      type: Number,
      default: 0,
    },
    plateNumber: {
      type: String,
      default: "default",
    },
  },
  testType: String,
  examinerAlloted: String,
  comment: String,
  testResult: String,
  licenseStatus: {
    type: String,
    default: "G1",
  },

  datePosted: {
    type: Date,
    default: new Date(),
  },
});

DriveTestSchema.plugin(uniqueValidator);

DriveTestSchema.pre("save", function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash;
    next();
  });
});

const DriveTest = mongoose.model("DriveTest", DriveTestSchema);
module.exports = DriveTest;
