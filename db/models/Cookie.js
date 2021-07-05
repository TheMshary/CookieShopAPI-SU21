const SequelizeSlugify = require("sequelize-slugify");
module.exports = (sequelize, DataTypes) => {
  const Cookie = sequelize.define("Cookie", {
    name: { type: DataTypes.STRING, allowNull: false },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1 },
      defaultValue: 4,
    },
    description: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
  });
  SequelizeSlugify.slugifyModel(Cookie, { source: ["name"] });
  return Cookie;
};
