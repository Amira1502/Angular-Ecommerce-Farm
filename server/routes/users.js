const express = require("express");
const router = express.Router();

//require controller
const userController = require("../controllers/userController");

// ************** All routes **********************

/**
 * @desc : test route
 * @method : GET
 * @path : http://localhost:7000/test
 * @data : nothing
 * @acess : public
 */
 router.get('/test', (req, res) => {
    res.status(200).send('Hello test')
})

 /**
 * @desc : get all users
 * @method : GET
 * @path : http://localhost:7000/users
 * @data : no data
 * @acess : public
 */
router.get("/", userController.getUsers);

 /**
 * @desc : get all users
 * @method : GET
 * @path : http://localhost:7000/users
 * @data : no data
 * @acess : public
 */
router.put("/:id_user", userController.update_User);

module.exports = router;