const { ProductModel } = require("../model/product.model.js");
async function ListProduct(call , callback) {
    try {
        const products = await ProductModel.find();
        callback(null, { products });
    } catch (error) {
        callback(error , null);
    }
}
async function GetProduct(call , callback) {
    try {
        const {id} = call.request;
        const product = await ProductModel.findOne({id});
        callback(null , product)
    } catch (error) {
        callback(error , null)
    }
}
async function createProduct(call , callback) {
    try {
        const {title, price} = call.request;
        await ProductModel.create({title, price});
        callback(null, {status: "created"});
        } catch (error) {
        callback(error, null);
    }
}
async function updateProduct(call , callback) {
    try {
        const {id} = call.request;
        const data = call.request;
        delete data.id; // Remove id from data to avoid updating it
        const result = await ProductModel.updateOne({id} , {$set: data});
        if(result.modifiedCount > 0) return callback(null, {status: "updated"});
        return callback({message: "cannot update product"}, null);
    } catch (error) {
        callback(error, null);
        
    }
}
async function deleteProduct(call , callback) {
    try {
        const {id} = call.request;

        const result = await ProductModel.deleteOne({id});
        if(result.deletedCount > 0) return callback(null, {status: "deleted"});
        return callback({message: "cannot delete product"}, null);
    } catch (error) {
        callback(error, null);
    }

}

module.exports = {
    ListProduct,
    GetProduct,
    createProduct,
    updateProduct,
    deleteProduct
}