const { Cookie } = require("../../db/models");

exports.cookieFetch = async (req, res) => {
  try {
    const cookies = await Cookie.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(cookies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCookie = async (req, res) => {
  try {
    const newCookie = await Cookie.create(req.body);
    // response: 201 CREATED
    res.status(201).json(newCookie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCookie = async (req, res) => {
  const { cookieId } = req.params;
  try {
    // check if cookie exists
    const foundCookie = await Cookie.findByPk(cookieId);
    // if cookie exists:
    if (foundCookie) {
      await foundCookie.destroy();
      res.status(204).end(); // NO CONTENT
    } else {
      //  give back response 404 Cookie Not Found
      res.status(404).json({ message: "Cookie Not Found." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCookie = async (req, res) => {
  const { cookieId } = req.params;
  try {
    // check if cookie exists
    const foundCookie = await Cookie.findByPk(cookieId);
    // if cookie exists:
    if (foundCookie) {
      // update cookie
      await foundCookie.update(req.body);
      res.status(204).end();
    } else {
      //  give back response 404 Cookie Not Found
      res.status(404).json({ message: "Cookie Not Found." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
