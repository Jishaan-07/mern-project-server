const mongoose = require('mongoose');


const bookingListSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    eventName: {
        type: String,
        required: true,
      },
      date: {
        type: String,
        required: true,
      },
      price: {
        type: String,
        required: true,
      },
      
});
const adminBookingList = mongoose.model('adminBookingList',bookingListSchema);

module.exports = adminBookingList;