const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'events',
    required: true,
  },
  eventName: {
    type: String,
    required: true,
  },
  eventImage: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  description: {
    type: String,  // Removed the unique constraint
    required: true
},
  date: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const bookings = mongoose.model('bookings', bookingSchema);

module.exports = bookings;
