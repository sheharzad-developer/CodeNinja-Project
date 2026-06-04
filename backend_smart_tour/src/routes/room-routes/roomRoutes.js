const express = require("express");
const { showRooms, showRoom, addRoom, updateRoom, deleteRoom } = require("../../controllers/room-controllers/room-controllers.js");
const {Auth} = require('../../middleware/auth')
const roomRouter = express.Router();
    roomRouter.get("/showrooms",  showRooms);
    roomRouter.get("/showroom/:id",  showRoom);
    roomRouter.post("/addroom",  addRoom);
    roomRouter.put("/updateroom",  updateRoom);
    roomRouter.delete("/deleteroom", deleteRoom);
module.exports = roomRouter;