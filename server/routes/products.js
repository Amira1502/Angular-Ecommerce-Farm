const express = require('express');
const router = express.Router();
const connectDB = require('../database/connectDB')

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
  
    let startValue;
    let endValue;
  
    if (page > 0) {
      startValue = page * limit - limit; // 0,10,20,30
      endValue = page * limit;
    } else {
      startValue = 0;
      endValue = 10;
    }
  
connectDB.query(
      `SELECT p.id, p.title, p.image, p.price, p.size, p.short_desc, p.quantity,
          c.title as category FROM products p JOIN categories c ON
              c.id = p.cat_id LIMIT ${startValue}, ${limit}`,
      (err, results) => {
        if (err) console.log(err);
        else res.json(results);
      }
    );
  });

  // GET SINGLE PRODUCT BY ID
router.get("/:productId", async (req, res) => {
    const { productId } = req.params;
    console.log(productId)
    connectDB.query(
      `SELECT p.id, p.title, p.image, p.description, p.price, p.size, p.quantity, p.short_desc,
          c.title as category FROM products p JOIN categories c ON
              c.id = p.cat_id WHERE p.id = ${productId}`,
      (err, results) => {
        if (err) console.log(err);
        else res.json(results[0]);
      }
    );
  });
  

module.exports = router;
