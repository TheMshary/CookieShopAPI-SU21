const express = require("express");

const {
  cookieFetch,
  deleteCookie,
  createCookie,
  updateCookie,
} = require("./controllers");
const router = express.Router();

// List Route
router.get("/", cookieFetch);

// Delete Route
router.delete("/:cookieId", deleteCookie);

// Create Route
router.post("/", createCookie);

// Update Route
router.put("/:cookieId", updateCookie);

module.exports = router;
