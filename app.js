// import express from "express";
const express = require("express");
const cookies = require("./cookies");
const cors = require("cors"); // yarn add cors

const app = express();

// Middleware
app.use(cors());

// Routes
app.get("/cookies", (req, res) => {
  // JSON = JavaScript Object Notation
  res.json(cookies);
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
