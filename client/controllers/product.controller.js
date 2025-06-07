const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");
const protoPath = path.join(__dirname, "..", ".." ,"protos", "product.proto");
const productProto = protoLoader.loadSync(protoPath);
const {productPackage} = grpc.loadPackageDefinition(productProto);
const productServiceURL = "localhost:50051";
const productClient = new productPackage.ProductService(productServiceURL, grpc.credentials.createInsecure());

function ListProduct(req , res , next) {
    productClient.ListProduct({}, (error, response) => {
        if (error) {
            return next(error);
        }
        res.status(200).json(response);
    });
}
function GetProduct(req , res , next) {
    const {id} = req.params;
    productClient.GetProduct({id} , (err , data) => {
        if(err) return res.json(err);
        return res.json(data)
    })
}
function createProduct(req , res , next) {
    const {title , price} = req.query;
    productClient.createProduct({title , price}, (err , data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
}
function updateProduct(req , res , next) {
    const data = req.query;
    productClient.updateProduct(data , (err , data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
}
function deleteProduct(req , res , next) {
    const {id} = req.params;
    productClient.deleteProduct({id} , (err , data)=> {
        if(err) return res.json(err);
        return res.json(data);
    })
}

module.exports = {
    ListProduct,
    GetProduct,
    createProduct,
    updateProduct,
    deleteProduct
};