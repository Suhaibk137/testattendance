const mongoose = require('mongoose');

const leaveRequestSchema = mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  leaveDate: {
    type: Date,
    required: true,
    validate: {
      validator: function(v) {
        return v != null && !isNaN(new Date(v).getTime());
      },
      message: 'Leave date must be a valid date'
    }
  },
  reason: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  }
}, {
  timestamps: true
});

// Add an index for employee and leaveDate to ensure uniqueness
leaveRequestSchema.index({ employee: 1, leaveDate: 1 }, { unique: true });

// Change the collection name to a separate collection specifically for leave requests
const LeaveRequest = mongoose.model('LeaveRequest', leaveRequestSchema, 'employee_leave_requests');

module.exports = LeaveRequest;
