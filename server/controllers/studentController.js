


const Student = require('../models/Student');
const FeeRecord = require('../models/FeeRecord');

exports.addStudent = async (req, res) => {
  const { name } = req.body;
  try {
    const student = new Student({
      name,
      createdBy: req.user.id,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`
    });
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find({ createdBy: req.user.id });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const student = await Student.findOne({ _id: id, createdBy: req.user.id });
    if (!student) return res.status(404).json({ message: 'Student not found' });

    if (name) {
      student.name = name;
      student.avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`;
    }
    await student.save();
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findOne({ _id: id, createdBy: req.user.id });
    if (!student) return res.status(404).json({ message: 'Student not found' });

    await Student.deleteOne({ _id: id });
    await FeeRecord.deleteMany({ student: id, createdBy: req.user.id });
    res.json({ message: 'Student and associated fee records deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};