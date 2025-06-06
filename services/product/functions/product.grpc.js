const { ProductModel } = require("../model/product.model.js");
async function ListProduct(call , callback) {
    try {
        const products = await ProductModel.find();
        callback(null, { products });
    } catch (error) {
        callback(error , null);
    }
}
async function GetProduct(call , callback) {}
async function createProduct(call , callback) {
    try {
        const {title, price} = call.request;
        await ProductModel.create({title, price});
        callback(null, {status: "created"});
        } catch (error) {
        callback(error, null);
    }
}
async function updateProduct(call , callback) {}
async function deleteProduct(call , callback) {}

module.exports = {
    ListProduct,
    GetProduct,
    createProduct,
    updateProduct,
    deleteProduct
}