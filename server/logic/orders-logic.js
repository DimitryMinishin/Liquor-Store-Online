const ordersDal = require("../dal/orders-dal");

//add new order
const addOrder = async (order) => {
    try {
        await ordersDal.addOrder(order);
    } catch (e) {
        throw e;
    }
    }


module.exports = {
    addOrder
}