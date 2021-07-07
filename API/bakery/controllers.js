const { Bakery, Cookie } = require("../../db/models");

exports.fetchBakery = async (bakeryId, next) => {
  try {
    const bakery = await Bakery.findByPk(bakeryId);
    return bakery;
  } catch (error) {
    next(error);
  }
};

exports.bakeryFetch = async (req, res, next) => {
  try {
    const bakeries = await Bakery.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Cookie,
        as: "cookies",
        attributes: ["id"],
      },
    });
    res.json(bakeries);
  } catch (error) {
    next(error);
  }
};

exports.createBakery = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
    const newBakery = await Bakery.create(req.body);
    // response: 201 CREATED
    res.status(201).json(newBakery);
  } catch (error) {
    next(error);
  }
};

exports.createCookie = async (req, res, next) => {
  try {
    if (req.file) req.body.image = `http://${req.get("host")}/${req.file.path}`;
    req.body.bakeryId = req.bakery.id;
    const newCookie = await Cookie.create(req.body);
    // response: 201 CREATED
    res.status(201).json(newCookie);
  } catch (error) {
    next(error);
  }
};
