const express = require("express");
const { showPackages} = require("../../controllers/packageController/getpackage");
// const {Auth} = require('../../middleware/auth')
const packageRoutes = express.Router();
packageRoutes.get("/showpackage",  showPackages);
 
module.exports = packageRoutes;