const connection = require("./connection-wrapper");

// get all products
async function getAllProducts() {
  let sql =
    "select product_id AS id, product_name AS name, product_description AS description, product_price AS price, product_category AS category, product_brand AS brand, product_category_name AS categoryName, product_quantity AS quantity from products";
  return await connection.execute(sql);
}

// get products by category
async function getProductsByCategory(category) {
  let sql = `select product_id AS id, product_name AS name, product_description AS description, product_price AS price, product_category AS category, product_brand AS brand, product_category_name AS categoryName from products where product_category = ?`;
  return await connection.execute(sql, [category]);
}

// update product by ID

async function updateProduct(id, product) {
  let sql = `update products set product_name = ?, product_description = ?, product_price = ? where product_id = ?`;
  return await connection.executeWithParameters(sql, [
    product.name,
    product.description,
    product.price,
    id,
  ]);
}

//delete product by ID
async function deleteProduct(id) {
  let sql = `delete from products where product_id = ?`;
  return await connection.executeWithParameters(sql, [id]);
}


module.exports = {
  getAllProducts,
  getProductsByCategory,
  updateProduct,
  deleteProduct,
};
