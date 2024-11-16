const express = require("express");
const cors = require("cors");
const path = require("path");
require("./db/mongoose.js");
const userRoute = require("./routers/user.js");
const carRoute = require("./routers/car.js");

const app = express();

// Enable CORS
app.use(cors()); // Allows all origins by default
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json()); // to access json from req handlers
app.use(userRoute);
app.use(carRoute);

module.exports = app;
