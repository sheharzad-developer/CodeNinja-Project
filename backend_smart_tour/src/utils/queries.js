const ordersTableQueries = {
    createOrderQuery : 'INSERT INTO orders (customer_id, order_total, order_date, booking_from, booking_to, rooms_booked, hotel_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING order_id'
}

module.exports = {ordersTableQueries}