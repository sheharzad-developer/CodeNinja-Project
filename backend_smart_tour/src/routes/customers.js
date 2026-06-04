var express = require("express");
const { getAllCustomers, postAllCustomers, putAllCustomers , delAllCustomers } = require("../controllers/tableController");
const { auth } = require("../middlewares/auth");
const customerRouter = express.Router();

customerRouter.get("/showcustomers",auth, getAllCustomers);
customerRouter.post("/addcustomers",auth, postAllCustomers);
customerRouter.put("/putcustomers",auth, putAllCustomers);
customerRouter.delete("/delcustomers",auth, delAllCustomers);


module.exports = customerRouter;
