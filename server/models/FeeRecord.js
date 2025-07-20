



const mongoose = require('mongoose');

const feeRecordSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  paymentMode: {
    type: String,
    enum: ['cash', 'online'],
    required: true
  },
  paymentDate: {
    type: Date
  },
  month: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('FeeRecord', feeRecordSchema);