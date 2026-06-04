var express = require("express");
const { Auth } = require("../../src/middleware/auth");
const { postPaymentDetails } = require('../controllers/paymentControl')
const paymentverificationRouter = express.Router();

paymentverificationRouter.post("/verifypayment",Auth, postPaymentDetails)

module.exports = paymentverificationRouter