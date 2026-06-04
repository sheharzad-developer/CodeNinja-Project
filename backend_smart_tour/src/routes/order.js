var express = require("express");
const { getAllOrders, postOrders, putOrders, delOrders } = require("../controllers/orderController");
const { Auth } = require("../../src/middleware/auth");
const orderRouter = express.Router();

orderRouter.get("/showorders",Auth, getAllOrders);
orderRouter.post("/addorders",Auth, postOrders);
orderRouter.put("/putorders",Auth, putOrders);
orderRouter.delete("/delorders",Auth, delOrders);


module.exports = orderRouter;
