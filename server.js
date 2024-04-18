const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./config/connectDb');

//config dot env file
dotenv.config();

//database call
connectDB();

// rest object
const app  = express();

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//routes
app.use('/api/v1/expense', require('./routes/expenseRoutes'));
// port
const port = process.env.PORT || 8080

//listen port
app.listen(port, () =>{
    console.log(
        `Server Running in ${process.env.NODE_ENV} Mode on port ${process.env.PORT}`
        .bgCyan.white
    );
});