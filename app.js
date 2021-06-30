// import express from "express";
const express = require("express");
const cors = require("cors"); // yarn add cors
const bodyParser = require("body-parser");
const cookieRoutes = require("./API/cookie/routes");
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

//=============== Cookie Routes ===============\\
app.use("/cookies", cookieRoutes);

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
