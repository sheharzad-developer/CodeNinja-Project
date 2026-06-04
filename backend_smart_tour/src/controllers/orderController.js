const { pool } = require('../connection/postgresql')
exports.getAllOrders = (req, res) => {
    const query = "SELECT * FROM orders";
    pool.query(query, (error, result) => {
        if (error) {
            throw error;
        }
        res.status(200).json(result.rows)
    })
}

exports.postOrders = (req, res) => {
    const { customer_id, order_total, order_date, booking_from, booking_to, rooms_booked } = req.body;
    console.log(req.body);
    const query = `INSERT INTO orders (customer_id, order_total, order_date, booking_from, booking_to, rooms_booked) 
    VALUES ('${customer_id}', '${order_total}', '${order_date}', '${booking_from}', '${booking_to}', '${rooms_booked}')`;
    pool.query(query, (error, result) => {
        if (error) {
            throw error;
        }
        res.status(200).json(req.body)
    })
};

exports.putOrders = (req, res) => {
    const { order_id, customer_id, order_total, order_date,  booking_from, booking_to, rooms_booked } = req.body;
    console.log(req.body);
    const query = `UPDATE orders SET (customer_id, order_total, order_date,  booking_from, booking_to, rooms_booked) 
    = ('${customer_id}', '${order_total}', '${order_date}', '${booking_from}', '${booking_to}', '${rooms_booked}') WHERE order_id ='${order_id}'`;
    pool.query(query, (error, result) => {
        if (error) {
            throw error;
        }
        res.status(200).json(req.body)
    })
};

exports.delOrders = (req, res) => {
    const { order_id } = req.body;
    console.log(req.body);
    const query = `DELETE from orders WHERE order_id ='${order_id}'`;
    pool.query(query, (error, result) => {
        if (error) {
            throw error;
        }
        res.status(200).json(req.body)
    })

};

