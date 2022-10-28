const shoppingCardDal = require("../dal/shopping-card-dal");

const createNewShoppingCard = async (shoppingCard) => {
  try {
    await shoppingCardDal.createNewShoppingCard(shoppingCard);
  } catch (e) {
    throw e;
  }
};

const isShoppingCartExist = async (id) => {
  try {
    let isShoppingCartExist = await shoppingCardDal.isShoppingCartExist(id);
    let successfulLoginResponse = {
      shoppingCartId: isShoppingCartExist[0].shopping_card_id,
    };
    return successfulLoginResponse;
  } catch (e) {
    throw e;
  }
};

//get ALL items from shopping card
const getAllItems = async (id) => {
  try {
    let items = await shoppingCardDal.getAllItems(id);
    return items;
  } catch (e) {
    throw e;
  }
};

module.exports = {
  createNewShoppingCard,
  isShoppingCartExist,
    getAllItems,
};
