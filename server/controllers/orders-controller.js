const express = require("express");
const router = express.Router();
const ordersLogic = require("../logic/orders-logic");

//add new order
router.post("/", async (request, response) => {
  try {
    let order = request.body;
    await ordersLogic.addOrder(order);
    response.json("Order was saved");
  } catch (e) {
    console.error(e);
    response.status(600).send(e.message);
  }
});

module.exports = router;