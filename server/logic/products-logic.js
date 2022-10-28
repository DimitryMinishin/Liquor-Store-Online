const productsDal = require("../dal/products-dal");

//get ALL products
const getAllProducts = async () => {
  return await productsDal.getAllProducts();
};

const getProductsByCategory = async (category) => {
  return await productsDal.getProductsByCategory(category);
};

//update product by ID
const updateProduct = async (id, product) => {
  return await productsDal.updateProduct(id, product);
};

//delete product by ID
const deleteProduct = async (id) => {
  return await productsDal.deleteProduct(id);
};


module.exports = {
  getAllProducts,
  getProductsByCategory,
  updateProduct,
  deleteProduct,
};
