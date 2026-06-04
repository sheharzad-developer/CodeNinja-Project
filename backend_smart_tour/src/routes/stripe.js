var express = require("express");
const { Auth } = require("../../src/middleware/auth");
const { checkoutSession, handleWebhook } = require("../../src/controllers/stripeController")
const stripeRouter = express.Router();


stripeRouter.post("/checkoutsession",  checkoutSession);
stripeRouter.post("/webhook",  handleWebhook);

module.exports = stripeRouter;