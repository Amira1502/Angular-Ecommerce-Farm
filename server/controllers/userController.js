// model database
const connectDB = require("../database/connectDB");

 /**
 * @desc : get all users
 * @method : GET
 * @path : http://localhost:7000/users
 * @data : no data
 * @acess : public
 */
const getUsers = async(req, res) => {
    connectDB.query("SELECT * FROM users", (err, results) => {
    if (err) console.log(err);
    else res.json(results)}          
);
};


 /**
 * @desc : update user
 * @method : GET
 * @path : http://localhost:7000/user/:_id'
 * @data : no data
 * @acess : public
 */
const updateUser = async(params) => {
    const { error } = updateUserValidation(params);
    if (error) throw { message: error.details[0].message, statusCode: 400 };
  
    const { userId, fullName, email, password } = params;
    const hashedPassword = md5(password.toString());
  
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users WHERE user_id = ? AND password = ?`,
        [userId, hashedPassword],
        (err, result) => {
          if (err) reject({ message: err, statusCode: 500 });
  
          if (result.length === 0) {
            reject({
              message: "Wrong credentials, please try again",
              statusCode: 400,
            });
          } else {
            if (email === result[0].email && fullName === result[0].full_name) {
              reject({
                message: "No new data has been provided",
                statusCode: 400,
              });
            }
  
            let query = "";
  
            if (email !== result[0].email && fullName !== result[0].full_name) {
              query = `full_name = '${fullName}', email = '${email}'`;
            } else if (email !== result[0].email) {
              query = `email = '${email}'`;
            } else {
              query = `full_name = '${fullName}'`;
            }
  
            db.query(
              `UPDATE users SET ${query} WHERE user_id = ?`,
              [userId],
              (err, result) => {
                if (err) throw { message: err, statusCode: 500 };
                resolve({
                  message: "User details have been successfully updated",
                  data: result,
                });
              }
            );
          }
        }
      );
    });
  }
  // exports modules
   module.exports = {getUsers, updateUser}