const express = require("express");
const router = express.Router();
const productsLogic = require("../logic/products-logic");

router.get("/", async (request, response) => {
  try {
    let allProducts = await productsLogic.getAllProducts();
    response.send(allProducts);
  } catch {
    response.sendStatus(500);
  }
});

//get products by category  
router.get("/category/:category", async (request, response) => {
  try {
    let productsByCategory = await productsLogic.getProductsByCategory(
      request.params.category
    );
    response.send(productsByCategory);
  } catch {
    response.sendStatus(500);
  }
});

//update product by ID
router.patch("/edit/:id", async (request, response) => {
try {
    let updatedProduct = await productsLogic.updateProduct(
      request.params.id,
      request.body
    );
    response.send(updatedProduct);
  } catch (e){
    response.status(500).send(e.message);
  }
});

// delete product by ID
router.delete("/delete/:id", async (request, response) => {
  console.log("delete product by ID");
  try {
    let deletedProduct = await productsLogic.deleteProduct(
      request.params.id
    );
    response.send(deletedProduct);
  } catch (e){
    response.status(500).send(e.message);
  }
});

module.exports = router;
