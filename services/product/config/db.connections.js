const { default: mongoose } = require("mongoose");

module.exports = mongoose.connect("mongodb://localhost:27017/grpc-nodejs")
.then(() => console.log("Connected to MongoDB successfully!"))
.catch(err => console.error("Failed to connect to MongoDB:", err));
