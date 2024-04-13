var express = require('express');
var router = express.Router();
const AdminController = require('../Controller/admin')

/* GET home page. */

// Admin signup
router.post('/signup' , AdminController.Admin_signup );

// Admin Login
router.post('/login' , AdminController.Admin_login );

module.exports = router;
