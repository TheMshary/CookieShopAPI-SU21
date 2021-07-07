const { Cookie, Bakery } = require("../../db/models");

exports.fetchCookie = async (cookieId, next) => {
  try {
    const cookie = await Cookie.findByPk(cookieId);
    return cookie;
  } catch (error) {
    next(error);
  }
};

exports.cookieFetch = async (req, res, next) => {
  try {
    const cookies = await Cookie.findAll({
      attributes: { exclude: ["bakeryId", "createdAt", "updatedAt"] },
      include: {
        model: Bakery,
        as: "bakery",
        attributes: ["name"],
      },
    });
    res.json(cookies);
  } catch (error) {
    next(error);
  }
};

exports.deleteCookie = async (req, res, next) => {
  try {
    await req.cookie.destroy();
    res.status(204).end(); // NO CONTENT
  } catch (error) {
    next(error);
  }
};

exports.updateCookie = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
    const updatedCookie = await req.cookie.update(req.body);
    res.json(updatedCookie);
  } catch (error) {
    next(error);
  }
};
