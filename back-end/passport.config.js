const {
  getUserByUsernameFromDb,
  getUserByIdFromDb,
} = require("./controllers/auth.dal");
const bcrypt = require("bcrypt");
const localStrategy = require("passport-local").Strategy;

const initialize = (passport) => {
  passport.use(
    new localStrategy(async (username, password, done) => {
      if (DEBUG) console.log("DEBUGGER(Passport): new localStrategy START.");

      const registeredUser = await getUserByUsernameFromDb(username);
      // If not the same username.
      if (registeredUser.rowCount < 1) {
        console.log("DEBUGGER(Passport): No user matches.");
        return done(null, false, {
          message: `No user that matches ${username}.`,
        });
      }
      try {
        if (await bcrypt.compare(password, registeredUser.rows[0].password)) {
          return done(null, registeredUser.rows[0]);
        } else {
          if (DEBUG) console.log("DEBUGGER(Passport): Password incorrect.");
          return done(null, false, { message: "Password incorrect." });
        }
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, done) => done(null, user.user_id));

  passport.deserializeUser(async (id, done) => {
    if (DEBUG) console.log("DEBUGGER(Passport): Deserialized");
    return done(null, await getUserByIdFromDb(id));
  });
};

module.exports = initialize;
