const connection = require("./connection-wrapper");

// add new order
async function addOrder(order) {
    let sql =
        "insert into orders (customer_id, shopping_card_id, first_name, last_name, shipping_street, shipping_city, shipping_state, zip_code, phone, email, 4_digits, order_date, final_price, shipping_date) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)"; // 14 parameters
    return await connection.executeWithParameters(sql, [
        order.customerId,
        order.shoppingCartId,
        order.firstName,
        order.lastName,
        order.address,
        order.city,
        order.state,
        order.zipCode,
        order.phone,
        order.email,
        order.fourDigits,
        order.orderDate,
        order.finalPrice,
        order.shippingDate
]);
    }
 
    module.exports = {
        addOrder
    }
    