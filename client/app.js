const express = require("express");
const { AllRoutes } = require("./controllers/routes/index.routes");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(AllRoutes);
app.listen(4000, ()=> {
    console.log("Server is running on port 4000");
})