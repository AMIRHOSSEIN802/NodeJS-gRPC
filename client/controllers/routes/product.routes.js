const { ListProduct, createProduct, updateProduct, deleteProduct, GetProduct } = require("./../product.controller.js");

const router = require("express").Router();
router.get("/list", ListProduct);
router.get("/create" , createProduct);
router.get("/update", updateProduct);
router.get("/delete/:id", deleteProduct);
router.get("/:id", GetProduct)
module.exports = {
    ProductRouter : router
}