const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 12;
const { getMsg, setSingleMsg, msgObj, msgData, multipleMsg } = require('../Util/message')

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
  appointmentsData: [
    {
      appointmentId: {
        type: Schema.Types.ObjectId,
        ref: 'Appointment'
      },
    }
  ],
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


userSchema.methods.storeData = function (data, req, res) {

  const { FirstName, LastName, Age, LicenseNumber, ieMake, model, year, platNumber, userId, date, time } = data

  if (this.LicenseNo !== 'default') {
    this.car_details.make = ieMake
    this.car_details.model = model
    this.car_details.year = year
    this.car_details.platNo = platNumber

    if (data?.time) {
      this.appointmentsData.push({
        appointmentId: time
      })
    }

    return this.save();

  } else {

    return bcrypt
      .hash(LicenseNumber, saltRounds)
      .then(hashedLicenseNumber => {
        this.firstName = FirstName
        this.lastName = LastName
        this.Age = Age
        this.LicenseNo = hashedLicenseNumber
        this.car_details.make = ieMake
        this.car_details.model = model
        this.car_details.year = year
        this.car_details.platNo = platNumber

        if (data?.time) {
          this.appointmentsData.push({
            appointmentId: time
          })
        }

        return this.save();
      })
    // .then((result => {

    //   setSingleMsg(req,
    //     msgObj(msgData.setMsgType(msgData.success),
    //       msgData.updateSuccess))
    //   res.redirect(`/G_TEST/${result._id}`)
    // }))
    // .catch(err => {
    //   multipleMsg(req, res, err)
    // });
  }
}

module.exports = mongoose.model('User', userSchema);