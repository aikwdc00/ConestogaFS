const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    trim: true,
    required: [true, 'Enter your User Name']
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'Enter your password']
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
    // required: [true,'Enter your First Name']
    validate: {
      validator: function (v) {
        if (!this.userName) return
        return /^[A-Za-z]{3,14}$/.test(v);
      },
      message: props => 'Enter your First Name'
    },
  },
  lastName: {
    type: String,
    trim: true,
    default: 'default',
    // required: [true, 'Enter your Last Name']
    // required: () => {
    //   if (this.userName) return true
    // },
    validate: {
      validator: function (v) {
        if (!this.userName) return
        return /^[A-Za-z]{3,14}$/.test(v);
      },
      message: props => 'Enter your Last Name'
    },
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
    // validate: {
    //   validator: function (v) {
    //     if (this.LicenseNo == 'default') return
    //     console.log('v', v)
    //     return /^[A-Z]{1}[0-9]{8,14}$/.test(v);
    //   },
    //   message: props => `${props.value} is a invalid LicenseNo`
    // },
    default: 'default'
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
      default: 0,
    },
    platNo: {
      type: String,
      default: 'default',
    },
  }
}, { timestamps: true, });

userSchema.methods.isDriver = function () {
  return this.userType == "Driver";
};

userSchema.methods.isExaminer = function () {
  return this.userType == "Examiner";
};

userSchema.methods.isAdmin = function () {
  return this.userType == "Admin";
};

// userSchema.pre('save', async function (next) { // pre-method, before saving to database
//   console.log('this', this)
//   const pwHash = await bcrypt.hash(this.password, saltRounds)
//   this.password = pwHash

//   if (this.LicenseNo == 'L00000000') {
//     const licenseNoHash = await bcrypt.hash(this.LicenseNo, saltRounds);
//     this.LicenseNo = licenseNoHash
//   }

//   next()
// });

module.exports = mongoose.model('User', userSchema);