// import middleware
const { updateUserValidation } = require("../middleware/validation");

// import schema db 
const connectDB = require("../database/connectDB");

const md5 = require("md5");

exports.updateUser = async (params) => {
  const { error } = updateUserValidation(params);
  if (error) throw { message: error.details[0].message, statusCode: 400 };

  const { id_user , name, email, password } = params;
  const hashedPassword = md5(password.toString());

  return new Promise((resolve, reject) => {
    connectDB.query(
      `SELECT * FROM users WHERE id_user = ? AND password = ?`,
      [id_user, hashedPassword],
      (err, result) => {
        if (err) reject({ message: err, statusCode: 500 });

        if (result.length === 0) {
          reject({
            message: "Wrong credentials, please try again",
            statusCode: 400,
          });
        } else {
          if (email === result[0].email && name === result[0].full_name) {
            reject({
              message: "No new data has been provided",
              statusCode: 400,
            });
          }

          let query = "";

          if (email !== result[0].email && name !== result[0].full_name) {
            query = `name = '${name}', email = '${email}'`;
          } else if (email !== result[0].email) {
            query = `email = '${email}'`;
          } else {
            query = `name = '${name}'`;
          }

          connectDB.query(
            `UPDATE users SET ${query} WHERE id_user = ?`,
            [id_user ],
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
};