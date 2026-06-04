const { pool } = require('../connection/postgresql')
const  {ordersTableQueries} =  require('../utils/queries');
const { createOrderQuery } = ordersTableQueries;
const getCurrentDate = require('../utils/getCurrentDate');
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

let sessionId = '';

const checkoutSession = async (req, res) => {
    const { customer_id, order_total, order_date, booking_from, booking_to, rooms_booked, hotel_id, name, location, type } = req.body;
    console.log(customer_id, order_total, order_date, booking_from, booking_to, rooms_booked, hotel_id, name, location, type);
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [{
                price_data: {
                    currency: "pkr",
                    product_data: {
                        name: `${name}`,
                        description: `${rooms_booked} rooms booked from ${booking_from} to ${booking_to}`
                    },
                    unit_amount: order_total * 100,
                },
                quantity: 1,
            }],
            metadata: {
                customer_id: customer_id,
                hotel_id: hotel_id,
                booking_from: booking_from,
                booking_to: booking_to,
                rooms_booked: rooms_booked

            },
            success_url: `${process.env.CLIENT_URL}/success`,
            cancel_url: `${process.env.CLIENT_URL}/cancel`,
        });
        sessionId = session.id
        res.json({ url: session.url });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

const handleWebhook = async (req, res) => {

    const event = req.body;

    switch (event.type) {
        case 'checkout.session.completed':
            const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
                sessionId
            );
            console.log("sessionWithLineItems: ", sessionWithLineItems);
            const { metadata, amount_total } = sessionWithLineItems;
            const {
                customer_id,
                hotel_id,
                booking_from,
                booking_to,
                rooms_booked
            } = metadata;
            try {
                const { rows } = await pool.query(createOrderQuery, [
                    customer_id, amount_total / 100, getCurrentDate(), booking_from, booking_to, rooms_booked, hotel_id
                ])
            } catch (error) {
                console.log({ message: error.message })
            }
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    res.status(200).end();
};



module.exports = { checkoutSession, handleWebhook }