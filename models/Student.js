const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    address:String,
    phone:String,
    postalCode:String,
    pic:String
});


module.exports = mongoose.model('Student',StudentSchema);