


const FeeRecord = require('../models/FeeRecord');
const Student = require('../models/Student');
const schedule = require('node-schedule');

let resetDate = 15; // Default to 15th of each month
let job = schedule.scheduleJob(`0 0 ${resetDate} * *`, async () => {
  console.log('Monthly fee reset triggered');
});

exports.addFeeRecord = async (req, res) => {
  const { studentId, paymentMode, paymentDate } = req.body;
  const date = paymentDate ? new Date(paymentDate) : new Date();
  try {
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const feeRecord = new FeeRecord({
      student: studentId,
      paymentMode,
      paymentDate: date,
      month: date.toLocaleString('default', { month: 'long' }),
      year: date.getFullYear(),
      createdBy: req.user.id
    });
    await feeRecord.save();
    res.status(201).json(feeRecord);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getFeeRecords = async (req, res) => {
  try {
    const feeRecords = await FeeRecord.find({ createdBy: req.user.id })
      .populate('student', 'name avatar');
    res.json(feeRecords);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateFeeRecord = async (req, res) => {
  const { id } = req.params;
  const { paymentMode, paymentDate } = req.body;
  try {
    const feeRecord = await FeeRecord.findOne({ _id: id, createdBy: req.user.id });
    if (!feeRecord) return res.status(404).json({ message: 'Fee record not found' });

    if (paymentMode) feeRecord.paymentMode = paymentMode;
    if (paymentDate) {
      const date = new Date(paymentDate);
      feeRecord.paymentDate = date;
      feeRecord.month = date.toLocaleString('default', { month: 'long' });
      feeRecord.year = date.getFullYear();
    }
    await feeRecord.save();
    res.json(feeRecord);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.resetFees = async (req, res) => {
  try {
    const { newResetDate } = req.body;
    if (newResetDate && newResetDate >= 1 && newResetDate <= 31) {
      resetDate = newResetDate;
      job.reschedule(`0 0 ${resetDate} * *`);
      console.log(`Fee reset date updated to ${resetDate}th of each month`);
    }
    console.log('Manual fee reset triggered');
    res.json({ message: 'Fee reset triggered successfully', resetDate });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


exports.deleteFeeRecord = async (req, res) => {
  const { id } = req.params;
  try {
    const feeRecord = await FeeRecord.findOne({ _id: id, createdBy: req.user.id });
    if (!feeRecord) return res.status(404).json({ message: 'Fee record not found' });

    await FeeRecord.deleteOne({ _id: id });
    res.json({ message: 'Fee record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};