const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Leave', 'Attendance', 'General'],
    default: 'General'
  },
  read: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Change the collection name to a separate collection specifically for notifications
const Notification = mongoose.model('Notification', notificationSchema, 'employee_notifications');

module.exports = Notification;
