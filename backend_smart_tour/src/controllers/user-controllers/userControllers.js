const { pool } = require('../../connection/postgresql');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcrypt');
require('dotenv').config();
const config = require('../../config/config');

const {ACCESS_TOKEN_SECRET} = config


const getUser = async(req, res) => {
    let query = await `SELECT * FROM users`;
    pool.query(query, (error, result) => {
        if (error) {
            throw error
        }
        res.status(200).json(result.rows);
    })
} 


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const query = {
            text: 'SELECT * FROM users WHERE email = $1',
            values: [email]
        }

        const result = await pool.query(query);
        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({ message: 'User Not Found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect Password' });
        }

        const accessToken = jwt.sign({ user_id: user.user_id, email: user.email }, ACCESS_TOKEN_SECRET);
        res.status(200).json({ accessToken, message: 'Login successfull' });
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({ message: 'server error' });
    }
}



  
  
  
  
  


  
    
  


const createUser = async(req,res)=>{
    const {username,contact_no,email,password} = req.body;

    try{
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = {
            text: 'INSERT INTO users (username, contact_no, email, password) VALUES ($1, $2, $3, $4) RETURNING user_id, username, email',
            values: [username, contact_no, email, hashedPassword]
        }

        const result = await pool.query(query);
        const user = result.rows[0];

        const accessToken = jwt.sign({ user_id: user.user_id, email: user.email }, ACCESS_TOKEN_SECRET);
        res.status(201).json({ accessToken });
    }catch(error){
        console.log(error);
        res.status(500).json({ message: 'server error' });
    }
 }



const updateUser = async(req, res) => {
    const { username,contact_no,email,password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = {
            text: 'UPDATE users SET username = $1, contact_no = $2, email = $3, password = $4 WHERE user_id = $5',
            values: [username, contact_no, email, hashedPassword, req.params.id]
        }
        await pool.query(query);
        res.status(200).json({ username, contact_no, email });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'server error' });
    }
}


const deleteUser = async(req, res) => {
    try {
        const query = {
            text: 'DELETE FROM users WHERE user_id = $1',
            values: [req.params.id]
        }
        await pool.query(query);
        res.status(200).json({ message: "record deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'server error' });
    }
}



  
   

  



module.exports = { getUser,createUser,updateUser,deleteUser,loginUser };