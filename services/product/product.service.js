require("./config/db.connections");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");
const protoPath = path.join(__dirname, "..", ".." ,"protos", "product.proto");
const productProto = protoLoader.loadSync(protoPath);
const {productPackage} = grpc.loadPackageDefinition(productProto);
const productServiceURL = "localhost:50051";
const { ListProduct, GetProduct, createProduct, updateProduct, deleteProduct} = require("./functions/product.grpc.js");
function main() {
    const server = new grpc.Server();
    server.addService(productPackage.ProductService.service, {
        ListProduct: ListProduct,
        GetProduct: GetProduct,
        createProduct: createProduct,
        updateProduct: updateProduct,
        deleteProduct: deleteProduct
    });
    server.bindAsync(productServiceURL, grpc.ServerCredentials.createInsecure(), (error, port) => {
        if (error) {
            console.error("Failed to bind server:", error);
            return;
        }
        console.log(`Server running at http://${productServiceURL}`);
        // server.start();
    });
}
main();