const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'Enter your First Name']
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Enter your Last Name']
  },
  Age: {
    type: Number,
    min: 18,
    max: 65,
    trim: true,
    required: true
  },
  DOB: {
    type: String,
  },
  LicenseNo: {
    type: Number,
    trim: true,
    unique: true
  },
  car_details: {
    make: {
      type: String,
    },
    model: {
      type: String,
    },
    year: {
      type: Number,
      // minLength: 4,
      // maxLength: 4,
    },
    platNo: {
      type: String,
    },
  }
});

module.exports = mongoose.model('User', userSchema);