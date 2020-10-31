const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('config');
const connectDb =  require('./config/database');
const connectDB = require('./config/database');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

app.get('/',(req,res) =>{
    res.send('hello world');
})
connectDB();

    app.use('/auth',require('./routes/auth'));
    app.use('/admin',require('./routes/admin'));

app.listen(config.get("PORT"),() => {
    console.log(`server is running on port : ${config.get('PORT')}`);
})
