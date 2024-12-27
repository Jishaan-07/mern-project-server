const events = require("../models/eventModel");


// add events
exports.addEventController = async (req, res) => {
    // Multer error handling (if any)
    if (req.fileValidationError) {
        return res.status(400).json({ error: req.fileValidationError });
    }

    if (!req.file) {
        return res.status(400).json({ error: "Please upload an image" });
    }

    // Process the event details and save the event
    const { eventName, category, location, date, price, seatsAvailable, description, status, eventType } = req.body;
    const eventImage = req.file.filename;

    if (!eventName || !category || !location || !date || !price || !seatsAvailable || !description || !status || !eventType || !eventImage) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    try {
        const newEvent = new events({
            eventImage,
            eventName,
            category,
            location,
            date,
            price,
            seatsAvailable,
            description,
            status,
            eventType
        });

        const savedEvent = await newEvent.save();
        return res.status(200).json(savedEvent);
    } catch (err) {
        return res.status(500).json({ error: "Error saving event" });
    }
};

// get home events
exports.getHomeEventsController = async (req, res) => {
 console.log("Inside getHomeEventsController");
 try{
    const allHomeEvents = await events.find().limit(6);
    res.status(200).json(allHomeEvents);
 }catch(err){
    res.status(401).json(err);
 }
 
};

// get all events
exports.getAllEventsController = async (req, res) => {
    console.log("Inside getAllEventsController");
  try{
     const allEvents = await events.find();
     res.status(200).json(allEvents);
    }catch(err){
        res.status(401).json(err);
    }
    
   };




// get event by id
exports.getEventByIdController = async (req, res) => {
    console.log("Inside getEventByIdController");
    const { id } = req.params;
    try {
        const event = await events.findById(id); // Renaming variable to 'event'
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }
        res.status(200).json(event);
    } catch (err) {
        console.error("Error fetching event by ID:", err); // Log the error
        res.status(500).json({ error: "Server error" });
    }
};

// delete eventByAdmin
// delete eventByAdmin
exports.deleteEventByAdminController = async (req, res) => {
    console.log("Inside deleteEventByAdminController");
    const { id } = req.params; // Get event ID from URL params
    
   try {
    const event = await events.findByIdAndDelete(id);
    if (!event) {
        return res.status(404).json({ error: "Event Not Found" });
    }
    return res.status(200).json({ message: `${event.eventName} deleted successfully` });
   } catch (err) {
       console.error(err);
       return res.status(500).json({ error: "An error occurred in backend" });
   }
};

