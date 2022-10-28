const connection = require("./connection-wrapper");

//create new shopping card

async function createNewShoppingCard(shoppingCard) {
try {
    let sql =
      "insert into shopping_cards (customer_id, card_created_date) values (?, ?)";
    return await connection.executeWithParameters(sql, [
      shoppingCard.customerId,
      shoppingCard.createdDate,
    ]);
  } catch (e) {
    console.log(e);
  }
}

// isShoppingCartExist - check if shopping cart exist by customer id
async function isShoppingCartExist(id) {
  try {
    let sql =
      "select shopping_card_id from shopping_cards where customer_id = ?";
    return await connection.executeWithParameters(sql, [id]);
  } catch (e) {
    console.log(e);
  }
}

//get ALL items from shopping card
async function getAllItems(id) {
  try {
    let sql =
      "select * from shopping_items where shopping_card_id = ?";
    return await connection.executeWithParameters(sql, [id]);
  } catch (e) {
    console.log(e);
  }
}


module.exports = {
  createNewShoppingCard,
  isShoppingCartExist,
  getAllItems,
};
