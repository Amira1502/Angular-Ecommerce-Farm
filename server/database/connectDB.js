// require mysql
const mysql = require("mysql");

//connect DB

const connectDB = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connectDB.connect((err) => {
  if (err) console.log(err);
  else console.log("MySQL is connected...");
});

// export module

module.exports = connectDB;