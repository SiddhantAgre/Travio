const express = require("express");
const router = express.Router();
const User = require("../model/user");
const passport = require("passport");

//signup
router.get("/signup", (req, res) => {
  res.render("./users/signup.ejs");
});

router.post("/signup", async (req, res) => {
  try {
    let { username, email, password } = req.body;
    let newUser = new User({ email, username });
    await User.register(newUser, password);
    req.login(newUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to Travio!");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
});

//login
router.get("/login", (req, res) => {
  res.render("./users/login.ejs");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    req.flash("success", "Welcome back to Travio");
    res.redirect("/listings");
  },
);

// logout
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "successfully logged out!");
    res.redirect("/listings");
  });
});

module.exports = router;
