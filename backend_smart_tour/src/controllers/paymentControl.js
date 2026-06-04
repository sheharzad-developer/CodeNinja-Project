const { pool } = require("../connection/postgresql");


const showPayments = (req, res) => {
  const query = `SELECT * FROM payments`;
  console.log(query);
  pool.query(query, (error, result) => {
    if (error) {
      throw error
    }
    res.status(200).json(result.rows);
  })

};

const postPaymentDetails = (req, res) => {
  const { name, card_number, expiry_date, security_code } = req.body;
  console.log(req.body);
  const query = `INSERT INTO card (name, card_number, expiry_date, security_code ) 
  VALUES ('${name}', ${card_number}, '${expiry_date}',${security_code})`;
  pool.query(query, (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(req.body)
  })
};

const addPayment = (req, res) => {
  const { order_id, payment_amount, payment_date } = req.body;
  console.log(req.body);
  console.log(order_id, payment_amount, payment_date);
  const query = `INSERT INTO payments (order_id, payment_amount, payment_date) 
  VALUES ('${order_id}', '${payment_amount}', '${payment_date}')`;
  pool.query(query, (error, result) => {
    console.log(query);
    if (error) {
      throw error
    }
    res.status(200).json(req.body);
  })

};

const editPayment = (req, res) => {
  const { payment_id, order_id, payment_amount, payment_date } = req.body;
  console.log(payment_id, order_id, payment_amount, payment_date);
  const query = `UPDATE payments SET(order_id, payment_amount, payment_date)
   = ('${order_id}', '${payment_amount}', '${payment_date}') WHERE payment_id ='${payment_id}'`;
  pool.query(query, (error, result) => {
    console.log(query);
    if (error) {
      throw error
    }
    res.status(200).json(req.body);
  })

};


const deletePayment = (req, res) => {
  const { payment_id } = req.body;
  console.log(payment_id);
  const query = `DELETE from payments WHERE payment_id ='${payment_id}'`;
  pool.query(query, (error, result) => {
    console.log(query);
    if (error) {
      throw error
    }
    res.status(200).json(req.body);
  })

};
module.exports = { postPaymentDetails, showPayments, addPayment, editPayment, deletePayment };
