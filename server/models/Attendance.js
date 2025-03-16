const mongoose = require('mongoose');

const attendanceSchema = mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  checkInTime: {
    type: Date
  },
  checkOutTime: {
    type: Date
  },
  status: {
    type: String,
    enum: ['Present', 'Absent', 'Half-Day', 'On Leave'],
    default: 'Absent'
  }
}, {
  timestamps: true
});

// Create a compound index to ensure one attendance record per employee per day
attendanceSchema.index({ employee: 1, date: 1 }, { unique: true });

// Change the collection name to a separate collection specifically for attendance
const Attendance = mongoose.model('Attendance', attendanceSchema, 'employee_attendance');

module.exports = Attendance;
