// require express
const express = require('express')

// require cors
const cors = require("cors");

// instance of express methods
const app = express()

// require and configure dotenv
require('dotenv').config()

//  require morgan
const logger = require("morgan");


// connection database
const db = require ('./database/connectDB')

// Middleware bodyparser (express json)
app.use(cors());
app.use(express.json())
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));


// Routes
app.use('/users', require('./routes/users'))
app.use('/products', require('./routes/products'))
app.use('/orders', require('./routes/orders'))



// Health check
app.get("/", (req, res) => {
  res.status(200).send("Health Check");
});




// create server
const PORT = process.env.PORT
app.listen(PORT, error => error ? console.error(`can not connect to server : ${error}`)
    : console.log(`Server is running on http://localhost:${PORT} ....`)
)