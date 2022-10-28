const express = require("express");
const router = express.Router();
const itemsLogic = require("../logic/items-logic");

//add item to shopping card
router.post("/add-item", async (request, response) => {
  try {
    let item = request.body;
    await itemsLogic.addItem(item);
    response.json("Item was saved");
  } catch (e) {
    console.error(e);
    response.status(600).send(e.message);
  }
});

//delete item from shopping card
router.delete("/delete-item/:id", async (request, response) => {
  try {
    let id = request.params.id;
    await itemsLogic.deleteItem(id);
    response.json("Item was deleted");
  } catch (e) {
    console.error(e);
    response.status(600).send(e.message);
  }
});

//delete ALL items from shopping card
router.delete("/delete-all-items/:id", async (request, response) => {
    try {
        let id = request.params.id;
        await itemsLogic.deleteAllItems(id);
        response.json("All items were deleted");
    } catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

//change quantity of item in shopping card
router.put("/change-quantity", async (request, response) => {
    try {
        let item = request.body;
        await itemsLogic.changeQuantity(item);
        response.json("Quantity was changed");
    } catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});



module.exports = router;
