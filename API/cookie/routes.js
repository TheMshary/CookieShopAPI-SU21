const express = require("express");

const {
  cookieFetch,
  deleteCookie,
  createCookie,
  updateCookie,
  fetchCookie,
} = require("./controllers");

const multer = require("multer");
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

//multer
const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});
const upload = multer({ storage });
// List Route
router.get("/", cookieFetch);

// Delete Route
router.delete("/:cookieId", deleteCookie);

// Create Route
router.post("/", upload.single("image"), createCookie);

// Update Route
router.put("/:cookieId", upload.single("image"), updateCookie);

module.exports = router;
