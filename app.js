// import express from "express";
const express = require("express");
let cookies = require("./cookies");
const cors = require("cors"); // yarn add cors
const bodyParser = require("body-parser");
const slugify = require("slugify");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

//=============== Cookie Routes ===============\\
// List Route
app.get("/cookies", (req, res) => {
  // JSON = JavaScript Object Notation
  res.json(cookies);
});

// Delete Route
app.delete("/cookies/:cookieId", (req, res) => {
  const { cookieId } = req.params;
  // check if cookie exists
  const foundCookie = cookies.find((cookie) => cookie.id === +cookieId);
  // if cookie exists:
  if (foundCookie) {
    cookies = cookies.filter((cookie) => cookie.id !== +cookieId);
    res.status(204).end(); // NO CONTENT
  } else {
    //  give back response 404 Cookie Not Found
    res.status(404).json({ message: "Cookie Not Found." });
  }
});

// Create Route
app.post("/cookies", (req, res) => {
  // generate ID
  const id = cookies.length + 1;
  // generate slug (using slugify)
  const slug = slugify(req.body.name, { lower: true });
  // put them all together with req.body in a new cookie object (newCookie)
  const newCookie = {
    id,
    slug,
    ...req.body,
  };
  // .push() newCookie onto cookies
  cookies.push(newCookie);
  // response: 201 CREATED
  res.status(201).json(newCookie);
});

// Update Route

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
