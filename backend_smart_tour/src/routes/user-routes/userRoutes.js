const express = require("express");
const { createUser, getUser, updateUser, deleteUser,loginUser  } = require("../../controllers/user-controllers/userControllers");
const { Auth } = require("../../middleware/auth");
const checkEmail = require("../../middleware/checkEmail");

const router = express.Router();



router.get("/",Auth, getUser);
router.post("/signup",checkEmail, createUser);   
router.post('/login',loginUser);
router.put("/:id",updateUser);
router.delete("/:id",Auth,deleteUser);

 


module.exports = router;    