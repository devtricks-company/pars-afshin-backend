const express = require('express');
const route = express.Router();
const {check} = require('express-validator');
const {adminLoginController} = require('../controller/authController');

    //@desc : get athunticate user
    //@mothod: GET
    // @access: private
    route.get('/',(req,res) => {
        res.send('get user');
    });

    route.post('/',[
        check('email','email must be follow the email pattern').isEmail(),
        check('password',"password must be filled and has at least 6 character").isLength({min:6})

    ],adminLoginController);

module.exports = route;