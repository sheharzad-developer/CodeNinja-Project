const express = require("express");
const { showHotels,showAllHotels, showHotel, addHotel, updateHotel, deleteHotel } = require("../../controllers/hotel-controllers/hotelControllers.js");
const { Auth } = require('../../middleware/auth')
const hotelRouter = express.Router();
hotelRouter.get("/showhotels",  showHotels);
hotelRouter.get("/showallhotels",  showAllHotels);
hotelRouter.get("/showhotel/:id",  showHotel);
hotelRouter.post("/addhotel", addHotel);
hotelRouter.put("/updatehotel", updateHotel);
hotelRouter.delete("/deletehotel/:id", deleteHotel);
module.exports = hotelRouter;