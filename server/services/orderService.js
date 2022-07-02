const connectDB = require ('../database/connectDB')

// create order services
exports.createOrder = async (params) => {
    const { userId, cart } = params;
    //console.log (userId, cart)

  
    if (!cart) throw { message: "cart was not provided", statusCode: 400 };
    if (!userId) throw { message: "userId was not provided", statusCode: 400 };
  
    return new Promise((resolve, reject) => {
      connectDB.query(
        `INSERT INTO orders (user_id) VALUES (?)`,
        [userId],
        (err, result) => {
          if (err) reject({ message: err, statusCode: 500 });
  
          if (result) {
            let newOrderId = result.insertId;
            console.log(newOrderId)
            cart.products.forEach(async (prod) => {
              connectDB.query(
                `SELECT p.quantity FROM products p WHERE p.id = ?`,
                [prod.id],
                (err, result) => {
                  if (err) reject({ message: err, statusCode: 500 });
  
                  let productQuantity = result[0].quantity; // db product
  
                  // deduct the quantity from products that were ordered in db
                  let updatedQuantity = productQuantity - prod.quantity;
                  if (updatedQuantity > 0) {
                    productQuantity = updatedQuantity;
                  } else productQuantity = 0;
  
                  connectDB.query(
                    `INSERT INTO orders_details (order_id, product_id, quantity) VALUES (?,?,?)`,
                    [newOrderId, prod.id, prod.quantity],
                    (err, result) => {
                      if (err) reject({ message: err, statusCode: 500 });
  
                      connectDB.query(
                        `UPDATE products SET quantity = ${productQuantity} WHERE id = ${prod.id}`,
                        (err, result) => {
                          if (err) reject({ message: err, statusCode: 500 });
                          console.log(result);
                        }
                      );
                    }
                  );
                }
              );
            });
  
            resolve({
              message: `Order was successfully placed with order id ${newOrderId}`,
              orderId: newOrderId,
              products: cart.products,
              statusCode: 201,
            });
          } else {
            reject({
              message: "New order failed while adding order details",
              statusCode: 500,
            });
          }
        }
      );
    });
  };