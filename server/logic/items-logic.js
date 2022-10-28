const itemsDal = require("../dal/items-dal");

//add item to shopping card
const addItem = async (item) => {
  try {
    await itemsDal.addItem(item);
  } catch (e) {
    throw e;
  }
};

//delete item from shopping card
const deleteItem = async (id) => {
  try {
    await itemsDal.deleteItem(id);
  } catch (e) {
    throw e;
  }
};

//delete ALL items from shopping card
const deleteAllItems = async (id) => {
  try {
    await itemsDal.deleteAllItems(id);
  } catch (e) {
    throw e;
  }
};

//change quantity of item in shopping card
const changeQuantity = async (item) => {
    try {
        await itemsDal.changeQuantity(item);
    } catch (e) {
        throw e;
    }
}

module.exports = {
  addItem,
  deleteItem,
  changeQuantity,
  deleteAllItems
};
