const jwt = require('jsonwebtoken');
const config = require('../config/config');
const {ACCESS_TOKEN_SECRET} = config;
const Auth = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    
    const token = authHeader && authHeader.split(" ")[1];
    
    if (token == null) return res.status(401).json('Please enter the token');
  
    const user = jwt.verify(token, ACCESS_TOKEN_SECRET, (error, user) => {
      
      if(error) return res.status(403).json({message:"token not match"})
      req.user = user 
      next()
    });
}
module.exports = {Auth};