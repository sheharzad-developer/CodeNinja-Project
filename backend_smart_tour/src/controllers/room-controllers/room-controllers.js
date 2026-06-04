const { pool } = require("../../connection/postgresql");

const showRooms = (req, res) => {
    let query = `SELECT * FROM rooms`;
    console.log(query);
    pool.query(query, (error, result) => {
        if (error) {
            throw error
        }
        res.status(200).json(result.rows);
    })
}

const showRoom = (req, res) => {
    const { id } = req.params;
    let query = `SELECT * FROM rooms WHERE id='${id}'`;
    console.log(query);
    pool.query(query, (error, result) => {
        if (error) {
            throw error
        }
        res.status(200).json(result.rows);
    })
    console.log(id);
}

const addRoom = (req, res) => {
    const { hotel_id, room_description, price, room_images } = req.body;
    console.log( hotel_id, room_description, price, room_images);
    const query = `INSERT INTO rooms (hotel_id, room_description, price, room_images ) VALUES ('${hotel_id}', '${room_description}', '${price}', '${room_images}') `;
    pool.query(query, (error, result) => {
        console.log(query);
        if (error) {
            throw error
        }
        res.status(200).json({success_message: "Room ADDED", body: req.body})
    })
}

const updateRoom = (req, res) => {
    const { id, hotel_id, room_description, price, room_images } = req.body;
    console.log(id, hotel_id, room_description, price, room_images);
    const query = `UPDATE rooms SET (hotel_id, room_description, price, room_images ) = ('${hotel_id}', '${room_description}', '${price}', '${room_images}') WHERE id = '${id}'`;
    pool.query(query, (error, result) => {
        console.log(query);
        if (error) {
            throw error
        }
        res.status(200).json({success_message: "Room UPDATED", body: req.body})
    })
}

const deleteRoom = (req, res) => {
    const { id } = req.params;
    console.log(id);
    const query = `DELETE FROM rooms WHERE id = '${id}'`;
    pool.query(query, (error, result) => {
        console.log(query);
        if (error) {
            throw error
        }
        res.status(200).json(`Hotel with ID: ${id} DELETED`);
    })
}

module.exports = { showRooms, showRoom, addRoom, updateRoom, deleteRoom };