var express = require('express');
var router = express.Router();
const usercoltroller = require('../Controller/user')

/* GET users listing. */
router.post('/signup', usercoltroller.user_signup);

router.post('/login', usercoltroller.user_login);


module.exports = router;
