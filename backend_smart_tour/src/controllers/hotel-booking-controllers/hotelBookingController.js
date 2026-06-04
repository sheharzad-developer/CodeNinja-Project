const { pool } = require("../../connection/postgresql");

const showBookings = (req, res) => {
    let query = `SELECT * FROM hotel_booking`;
    console.log(query);
    pool.query(query, (error, result) => {
        if (error) {
            throw error
        }
        res.status(200).json(result.rows);
    })
}

const showBooking = (req, res) => {
    console.log("this is show booking")
    const { id } = req.params;
    let query = `SELECT * FROM hotel_booking WHERE id='${id}'`;
    console.log(query);
    pool.query(query, (error, result) => {
        if (error) {
            throw error
        }
        res.status(200).json(result.rows);
    })
    console.log(id);
}

const addBooking = (req, res) => {
    const { room_id, hotel_id, category_id, user_id, checkin, checkout, status, price } = req.body;
    const query = `INSERT INTO hotel_booking (room_id, hotel_id, category_id, user_id, checkin, checkout, status, price ) VALUES ('${room_id}', '${hotel_id}', '${category_id}', '${user_id}', 
    '${checkin}', '${checkout}' ,'${status}' , '${price}');`
    pool.query(query, (error, result) => {
        console.log(query);
        if (error) {
            throw error
        }
        res.status(200).json(req.body)
    })
}

const updateBooking = (req, res) => {
    const { id, room_id, hotel_id, category_id, user_id, checkin, checkout, status, price } = req.body;
    console.log(id, room_id, hotel_id, category_id, user_id, checkin, checkout, status, price);
    const query = `UPDATE hotel_booking SET (room_id, hotel_id, category_id, user_id, checkin, checkout, status, price) = ('${room_id}', '${hotel_id}', '${category_id}', '${user_id}', '${checkin}', '${checkout}' ,'${status}' , '${price}') WHERE id = '${id}'`;
    pool.query(query, (error, result) => {
        console.log(query);
        if (error) {
            throw error
        }
        res.status(200).json(req.body)
    })
}

const deleteBooking = (req, res) => {
    const { id } = req.body;
    console.log(id);
    const query = `DELETE FROM hotel_booking WHERE id = '${id}'`;
    pool.query(query, (error, result) => {
        console.log(query);
        if (error) {
            throw error
        }
        res.status(200).json(req.body)
    })
}

module.exports = { showBookings, showBooking, addBooking, updateBooking, deleteBooking };