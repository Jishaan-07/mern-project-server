const express = require('express');
const userController = require('../controllers/userController');
const eventController = require('../controllers/eventController');
const bookingController = require('../controllers/bookingController'); // Import bookingController
const multerMiddleware = require('../middlewares/multerMiddleware');
const adminBookingListController = require('../controllers/adminBookingListController')
const router = new express.Router();

// register - post
router.post('/register', userController.registerController);

// login - post
router.post('/login', userController.loginController);

// add event - post
router.post('/add-event',multerMiddleware.single('eventImage'),eventController.addEventController);

// get home events - get
router.get('/home-events',eventController.getHomeEventsController);

// get all events - get
router.get('/all-events', eventController.getAllEventsController);

// get event by id - get
router.get('/event-view/:id', eventController.getEventByIdController);

// add booking - post
router.post('/add-booking',bookingController.addBookingController); // Add booking route

// routes/router.js
router.get('/bookings/:userId', bookingController.getBookingsByUserId);


// Route to delete a booking
router.delete('/:bookingId', bookingController.deleteBookingController);

// adminBookingList - post
router.post('/booking-list',adminBookingListController.addAdminBookingListController);

// adminBookingList - get
router.get('/booking-list', adminBookingListController.getAllAdminBookingsController);

// delete card
router.delete('/events-list/:id', eventController.deleteEventByAdminController);

// Route to update profile
router.put('/my-profile',  userController.updateProfileController);  // PUT request to update profile
 
module.exports = router;
