const express = require('express');
const route = express.Router();
const auth = require('../middleware/authMiddleware');
const {check} = require('express-validator');
const {registerAdminController} = require('../controller/adminController');


route.post('/',[auth,[
    check('name',"name is required please fill that").notEmpty(),
    check('email',"email must follow email pattern").isEmail(),
    check('password','password must be have at least 6 character').isLength({min:6}),
    
]],registerAdminController);

module.exports = route;