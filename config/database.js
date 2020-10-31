const mongoose = require('mongoose');
const config = require('config');
const connectionString = config.get('mongoURI');

const connectDB = () =>{
    mongoose.connect(connectionString,{
        useNewUrlParser:true,
        useCreateIndex:true,
        useFindAndModify:false,
        useUnifiedTopology:true
    }).then(() => {
        console.log('mongodb is connected');
    }).catch(err => console.log(err));
}


module.exports = connectDB;