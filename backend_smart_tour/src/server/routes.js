const express=require("express")
const route=express.Router();
const stripeRouter = require("../routes/stripe");
const orderRouter = require("../../src/routes/order");
const paymentRouter = require('../routes/payment')
const paymentverificationRouter = require('../routes/verificationpayment')

// module.exports=route
const app = require ('./expressApp');
const bookingRouter = require('../routes/hotel-booking-routes/hotelBookingRoutes');
const hotelRouter = require('../routes/hotel-routes/hotelRoutes');
const roomRouter = require('../routes/room-routes/roomRoutes');
const userRouter = require('../routes/user-routes/userRoutes')
const packageRoutes=require('../routes/packageRoutes/packageRoutes')

app.use('/hotel/', bookingRouter);
app.use('/hotel/', hotelRouter);
app.use('/hotel/', roomRouter);
app.use('/api/user',userRouter)
app.use('/api/stripe', stripeRouter)
app.use('/api/orders', orderRouter)
app.use("/api/user", paymentRouter);
app.use("/api/users", paymentverificationRouter)
app.use("/api/tour", packageRoutes)



// app.use('/api/admin/', adminRoutes);

module.exports = app;
