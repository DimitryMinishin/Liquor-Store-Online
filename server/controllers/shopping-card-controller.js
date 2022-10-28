const express = require("express");
const router = express.Router();
const shoppingCardLogic = require("../logic/shopping-card-logic");

//create new shopping card
router.post("/", async (request, response) => {
  try {
    let shoppingCard = request.body;
    await shoppingCardLogic.createNewShoppingCard(shoppingCard);
    response.json("Shopping Card was saved");
  } catch (e) {
    console.error(e);
    response.status(600).send(e.message);
  }
  isShoppingCardExist;
});

//isShoppingCartExist
router.get("/isShoppingCardExist/:id", async (request, response) => {
  try {
    let id = request.params.id;
    let isShoppingCartExist = await shoppingCardLogic.isShoppingCartExist(id);
    response.json(isShoppingCartExist);
  } catch (e) {
    console.error(e);
    response.status(600).send(e.message);
  }
});

//get ALL items from shopping card
router.get("/get-all-items/:id", async (request, response) => {
  try {
    let id = request.params.id;
    let items = await shoppingCardLogic.getAllItems(id);
    response.json(items);
  } catch (e) {
    console.error(e);
    response.status(600).send(e.message);
  }
});

module.exports = router;
