const { pool } = require("../../connection/postgresql");

const showPackages = (req, res) => {
    let query = `SELECT * FROM packages`;
    console.log(query);
    pool.query(query, (error, result) => {
        if (error) {
            return res.status(500).json("server error");
        }
        res.status(200).json(result.rows);
    })
}
module.exports = {showPackages}