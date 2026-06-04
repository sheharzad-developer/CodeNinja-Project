const express = require("express");
const { showBookings, showBooking, addBooking, updateBooking, deleteBooking } = require("../../controllers/hotel-booking-controllers/hotelBookingController");

    const bookingRouter = express.Router();
    bookingRouter.get("/showbookings",  showBookings);
    bookingRouter.get("/showbooking/:id", showBooking);
    bookingRouter.post("/addbooking", addBooking);
    bookingRouter.put("/updatebooking", updateBooking);
    bookingRouter.delete("/deletebooking", deleteBooking);
module.exports = bookingRouter;