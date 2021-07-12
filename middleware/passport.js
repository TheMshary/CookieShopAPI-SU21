const LocalStrategy = require("passport-local").Strategy;
const bycrpt = require("bcrypt");

const { User } = require("../db/models");

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({
      where: { username },
    });
    const passwordsMatch = user
      ? await bycrpt.compare(password, user.password)
      : false;
    if (passwordsMatch) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    done(error);
  }
});
