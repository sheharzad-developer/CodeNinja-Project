const { pool } = require('../connection/postgresql');

const checkEmail = async(req,res, next)=>{
      const {email} = req.body;

      try{
       const query = {
           text: 'SELECT 1 FROM users WHERE email = $1',
           values: [email]
       }

      const result = await pool.query(query)

        if(result.rows.length > 0){
            res.status(409).json("user already exist")
        }
        else{
            next()
        }
      }catch(error){
       console.log(error)
       res.status(500).json("server error")
      }
   }
   module.exports= checkEmail
  