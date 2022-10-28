const connection = require("./connection-wrapper");

//add item to shopping card
async function addItem(item) {
  try {
    let sql =
      "insert into shopping_items (product_id, name, category_name, quantity, price, shopping_card_id) values (?, ?, ?, ?, ?, ?)";
    return await connection.executeWithParameters(sql, [
      item.itemId,
      item.itemName,
      item.itemCategoryName,
      item.itemQuantity,
      item.itemPrice,
      item.shoppingCardId,
    ]);
  } catch (e) {
    console.log(e);
  }
}

//delete item from shopping card
async function deleteItem(id) {
  try {
    let sql = "delete from shopping_items where product_id = ?";
    return await connection.executeWithParameters(sql, [id]);
  } catch (e) {
    console.log(e);
  }
}

//delete ALL items from shopping card
async function deleteAllItems(id) {
  try {
    let sql = "delete from shopping_items where shopping_card_id = ?";
    return await connection.executeWithParameters(sql, [id]);
  } catch (e) {
    console.log(e);
  }
}

//change quantity of item in shopping card
async function changeQuantity(item) {
    try {
        let sql = "update shopping_items set quantity = ? where product_id = ?";
        return await connection.executeWithParameters(sql, [item.itemQuantity, item.itemId]);
    } catch (e) {
        console.log(e);
    }
}


module.exports = {
  addItem,
  deleteItem,
  deleteAllItems,
  changeQuantity
}
