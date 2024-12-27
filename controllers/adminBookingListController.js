const adminBookingList = require('../models/adminBookingListModal');
const User = require('../models/userModel'); // Assuming the User model exists
const Event = require('../models/eventModel'); // Assuming the Event model exists

exports.addAdminBookingListController = async (req, res) => {
  const { userId, eventId } = req.body;

  if (!userId || !eventId) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  try {
    // Fetch user details from the User collection
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Fetch event details from the Event collection
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Create a new booking entry in adminBookingList collection
    const newBooking = new adminBookingList({
      userName: user.username,  // Assuming 'name' is a field in the User model
      eventName: event.eventName, // Assuming 'name' is a field in the Event model
      date: event.date,      // Assuming 'date' is a field in the Event model
      price: event.price     // Assuming 'price' is a field in the Event model
    });

    // Save the new booking entry to the database
    await newBooking.save();

    res.status(200).json(newBooking)

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while adding the booking' });
  }
};

exports.getAllAdminBookingsController = async (req, res) => {
    try {
      // Fetch all bookings from the adminBookingList collection
      const bookings = await adminBookingList.find();  // This fetches all bookings
  
      // If no bookings are found, return a message
      if (bookings.length === 0) {
        return res.status(404).json({ message: 'No bookings found' });
      }
  
      // Send the bookings as the response
      res.status(200).json(bookings);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching the bookings' });
    }
  };

