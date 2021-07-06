const express = require("express");

const {
  cookieFetch,
  deleteCookie,
  createCookie,
  updateCookie,
  fetchCookie,
} = require("./controllers");
const router = express.Router();

// param middleware (parameter)
router.param("cookieId", async (req, res, next, cookieId) => {
  // get the cookie with id cookieID
  const cookie = await fetchCookie(cookieId, next);
  if (cookie) {
    // store it in req
    req.cookie = cookie;
    next();
  } else {
    // give back response 404 Cookie Not Found
    const error = new Error("Cookie Not Found.");
    error.status = 404;
    next(error);
  }
});

// List Route
router.get("/", cookieFetch);

// Delete Route
router.delete("/:cookieId", deleteCookie);

// Create Route
router.post("/", createCookie);

// Update Route
router.put("/:cookieId", updateCookie);

module.exports = router;
