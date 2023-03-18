const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointSchema = new Schema({
  appointments: [
    {
      date: {
        type: String,
        trim: true,
      },
      time: {
        type: String,
        trim: true,
      }
    }
  ]
},
  {
    timestamps: true,
  });


module.exports = mongoose.model('Appointment', appointSchema);