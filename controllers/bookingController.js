const bookings = require('../models/bookingModel');

exports.addBookingController = async (req, res) => {
  const { userId, eventId, eventName, eventImage, status,description, date, price, location } = req.body;

  // Ensure all required fields are present
  if (!userId || !eventId || !eventName || !eventImage || !status || !description|| !date || !price || !location) {
      return res.status(400).json({ error: 'All fields are required!' });
  }

  try {
      // Check if a booking for this user and event already exists
      const existingBooking = await bookings.findOne({ userId, eventId });

      if (existingBooking) {
          return res.status(400).json({ error: 'You have already booked this event.' });
      }

      // Proceed to create the booking if it doesn't exist already
      const newBooking = new bookings({
          userId,
          eventId,
          eventName,
          eventImage,
          status,
          description,
          date,
          price,
          location,
      });

      const savedBooking = await newBooking.save();
      res.status(200).json(savedBooking);
  } catch (err) {
      console.error('Error saving booking:', err);
      res.status(500).json({ error: 'Error saving booking' });
  }
};



// controllers/bookingController.js
exports.getBookingsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const myBookings = await bookings.find({ userId });
    res.status(200).json(myBookings);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ error: 'Error fetching bookings' });
  }
};


// Controller for deleting a booking
exports.deleteBookingController = async (req, res) => {
  const { bookingId } = req.params;

  try {
      const deletedBooking = await bookings.findByIdAndDelete(bookingId);

      if (!deletedBooking) {
          return res.status(404).json({ error: 'Booking not found' });
      }

      res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (err) {
      console.error('Error deleting booking:', err);
      res.status(500).json({ error: 'Error deleting booking' });
  }
};
