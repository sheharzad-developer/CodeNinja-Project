const { pool } = require('../connection/postgresql')

exports.getAllCustomers = (req, res) => {
    const query = "SELECT * FROM customers";
    pool.query(query, (error, result) => {
        if (error) {
            throw error;
        }
        res.status(200).json(result.rows)
    })
}

exports.postAllCustomers = (req, res) => {
    const { first_name, last_name, email } = req.body;
    console.log(req.body);
    const query = `INSERT INTO customers (first_name, last_name, email) 
    VALUES ('${first_name}', '${last_name}', '${email}')`;
    pool.query(query, (error, result) => {
        if (error) {
            throw error;
        }
        res.status(200).json(req.body)
    })
};

exports.putAllCustomers = (req, res) => {
    const {customer_id, first_name, last_name, email  } = req.body;
    console.log(req.body);
    const query = `UPDATE customers SET (first_name, last_name, email) 
    = ('${first_name}', '${last_name}', '${email}') WHERE customer_id ='${customer_id}'`;
    pool.query(query, (error, result) => {
        if (error) {
            throw error;
        }
        res.status(200).json(req.body)
    })
};

exports.delAllCustomers= (req, res) => {
    const { customer_id } = req.body;
    console.log(req.body);
    const query = `DELETE from customers WHERE customer_id ='${customer_id}'`;
    pool.query(query, (error, result) => {
        if (error) {
            throw error;
        }
        res.status(200).json(req.body)
    })

};