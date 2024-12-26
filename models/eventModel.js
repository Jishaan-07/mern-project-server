const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventImage: {
        type: String,
        required: true
    },
    eventName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    seatsAvailable: {
        type: String,
        required: true
    },
    description: {
        type: String,  // Removed the unique constraint
        required: true
    },
    status: {
        type: String,
        required: true,
    },
    eventType: {
        type: String,
        required: true,
     },
});

const events = mongoose.model('events', eventSchema);

module.exports = events;
