const express = require('express');
const addAStudentController = require('../controller/studnetController/addAStudentController');
const {check} = require('express-validator');
const route = express.Router();
const auth = require('../middleware/authMiddleware');
// get all student
// private

//route.get('/',getAllStudentController);

// get a student
// public
//route.get('/:id',getAStudentController);
// add a student
// private
route.post('/primary',[ 
    auth,
    [
        check('email','email must be follow email address').isEmail(),
        check('password','password must be at least 6 character').isLength({min:6})
    ]
],addAStudentController);
// edit a student
// private
//route.put('/:id',editAStudentController);


module.exports = route;