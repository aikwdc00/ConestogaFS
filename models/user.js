const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 12;

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    trim: true,
    required: [true, 'Enter your User Name']
    // required: true,
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'Enter your password']
    // required: true,
  },
  userType: {
    type: String,
    enum: ["Driver", "Examiner", "Admin"],
    required: true,
  },
  firstName: {
    type: String,
    trim: true,
    default: 'default',
    // required: [true, 'Enter your First Name']
  },
  lastName: {
    type: String,
    trim: true,
    default: 'default',
    // required: [true, 'Enter your Last Name']
  },
  Age: {
    type: Number,
    min: 18,
    max: 65,
    trim: true,
    default: 18,
    // required: true
  },
  LicenseNo: {
    type: String,
    trim: true,
    validate: {
      validator: function (v) {
        console.log('v', v)
        return /^[A-Z]{1}[0-9]{8,14}$/.test(v);
      },
      message: props => `${props.value} is a invalid LicenseNo`
    },
  },
  car_details: {
    make: {
      type: String,
      default: 'default',
    },
    model: {
      type: String,
      default: 'default',
    },
    year: {
      type: Number,
      minLength: 0,
      maxLength: 4,
      default: '0',
    },
    platNo: {
      type: String,
      default: 'default',
    },
  }
});

userSchema.methods.isDriver = function () {
  return this.UserType == "Driver";
};

userSchema.methods.isExaminer = function () {
  return this.UserType == "Examiner";
};

userSchema.methods.isAdmin = function () {
  return this.UserType == "Admin";
};

userSchema.pre('save', async function (next) { // pre-method, before saving to database

  const pwHash = await bcrypt.hash(this.password, saltRounds)
  this.password = pwHash

  if (this.LicenseNo) {
    const licenseNoHash = await bcrypt.hash(this.LicenseNo, saltRounds);
    this.LicenseNo = licenseNoHash
  }

  next()
});

module.exports = mongoose.model('User', userSchema);