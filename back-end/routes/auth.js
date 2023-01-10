const express = require("express");
const router = express.Router();

const passport = require("passport");
const bcrypt = require("bcrypt");

const authDal = require("../controllers/auth.dal");

router.post("/api/login", (req, res, next) => {
  if (DEBUG) console.log("/api/login body", req.body);

  passport.authenticate("local", async (err, user) => {
    if (err) return next(err);
    if (!user) {
      res.status(404).json({
        loggedIn: false,
        ERROR: "Username or password is incorrect.",
      });
      if (DEBUG) console.log("DEBUGGER: User doesn't exist.", user);
    } else {
      // Don't think I need this here because authenticate does this automatically.
      req.logIn(user, (err) => {
        if (err) return next(err);
        res.json({ loggedIn: true, message: "Successfully Authenticated" });
        if (DEBUG)
          console.log(
            "DEBUGGER: Successfully authenticated and logged in.",
            user
          );
      });
    }
  })(req, res, next);
});

router.post("/api/register", async (req, res) => {
  try {
    if (DEBUG) console.log("/api/register body", req.body);

    const existingUsername = await authDal.existingUsername(req.body.username);
    const existingEmail = await authDal.existingEmail(req.body.email);

    if (existingUsername.rowCount >= 1 || existingEmail.rowCount >= 1) {
      // 409 means conflict.
      res.status(409).json({
        registered: false,
        ERROR: "Username or Email is Already Taken",
      });
      if (DEBUG) console.log("DEBUGGER: User already exists.");
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = await authDal.addUserToDb(
        req.body.username,
        req.body.email,
        hashedPassword,
        req.body.phone,
        req.body.favGenre
      );

      res.json({ registered: true, user: newUser.rows[0] });
      if (DEBUG)
        console.log("DEBUGGER: User was registered into the database.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      registered: false,
      ERROR: "/auth/api/register failed to send user.",
    });
  }
});

// To get the user.
router.get("/api/user", (req, res) => {
  // console.log("What2", req.user.rows[0]);
  // If logged in.
  if (req.user) {
    res.send(req.user); // The user is stored in req.user when authenticated on login.
  } else {
    res.send(false);
  }
});

router.post("/api/logout", async (req, res, next) => {
  try {
    // req.logout((error) => {
    //   if (error) {
    //     res.json({
    //       loggedIn: true,
    //       ERROR: "Unexpected error, logout was unsuccessful.",
    //     });
    //     return next(error);
    //   }
    //   req.session = null;
    //   req.user = null;
    //   res.json({
    //     loggedIn: false,
    //     message: "User successfully logged out.",
    //   });
    // });

    // Better then req.logout; actually gets rid of req.user.
    req.session.destroy((error) => {
      if (error) {
        res.json({
          loggedIn: true,
          ERROR: "Unexpected error, logout was unsuccessful.",
        });
        if (DEBUG)
          console.log("DEBUGGER: Unexpected error, logout was unsuccessful.");
        return next(error);
      }
      res.json({
        loggedIn: false,
        message: "User successfully logged out.",
      });
      if (DEBUG) console.log("DEBUGGER: User successfully logged out.");
    });
    // res.clearCookie("connect.sid");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      loggedIn: false,
      ERROR: "Unexpected error, logout was unsuccessful.",
    });
  }
});

module.exports = router;
