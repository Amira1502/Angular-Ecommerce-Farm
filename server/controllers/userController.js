// model database
const connectDB = require("../database/connectDB");

// export service 
const { updateUser } = require("../services/userService");


 /**
 * @desc : get all users
 * @method : GET
 * @path : http://localhost:4000/users
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
 * @method : PUT
 * @path : http://localhost:4000/users/:id_user'
 * @data : no data
 * @acess : public
 */
const update_User =async (req, res, next) => {
    const { id_user } = req.params;
    const { name, email, password } = req.body;
  
    updateUser({ id_user, name, email, password })
      .then((result) => {
        const { statusCode = 200, message, data } = result;
        res.status(statusCode).send({ message, data });
      })
      .catch((err) => {
        const { statusCode = 400, message, data } = err;
        res.status(statusCode).send({ message, data }) && next(err);
      });
  };

  // exports modules
   module.exports = {getUsers, update_User}