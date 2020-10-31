const mongoose = require('mongoose');


const AdminSchema = mongoose.Schema({
    name:String,
    email:String,
    pic:String,
    password:String,
    active:Boolean,
    superAdmin:Boolean,
    createAt:String
});


module.exports = mongoose.model('Admin',AdminSchema);