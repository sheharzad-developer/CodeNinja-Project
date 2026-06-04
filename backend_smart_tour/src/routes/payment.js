var express = require("express");
const { Auth } = require("../../src/middleware/auth");
const {addPayment, showPayments, editPayment, deletePayment , postPaymentDetails} = require('../controllers/paymentControl')
const paymentRouter = express.Router();

    paymentRouter.get("/showpayments",Auth, showPayments);
    paymentRouter.post("/addpayment",Auth, addPayment);
    paymentRouter.put("/editpayment",Auth, editPayment);
    paymentRouter.delete("/deletepayment",Auth, deletePayment);
    paymentRouter.post("/verifypayment", postPaymentDetails);


module.exports = paymentRouter;
