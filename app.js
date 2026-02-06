const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const path = require("path");
const listing = require("./Routes/listings.js");
const review = require("./Routes/reviews.js");
const user = require("./Routes/users.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./model/user.js");

const sessionOptions = {
  secret: "mysecret",
  resave: false,
  saveUninitialized: true,
  cookie:{
    expires: Date.now() * 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true
  }
}

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
})

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/travio");
}

main().then(() => {
  console.log("Database connected!");
});

app.get("/", (req, res) => {
  res.send("I am the root route!");
});

//listiings
app.use("/listings", listing);

//reviews
app.use("/listings", review);

//users
app.use("/", user);

app.get("/demoUser", async (req, res) => {
  const user1 = new User({
    email: "student@gmail.com",
    username: "Student"
  })

  let newUser = await User.register(user1, "hello!");
  res.send(newUser);
})

//middlewares
app.use((err, req, res, next) => {
  let { status = 500, message = "Something went wrong" } = err;
  console.log(err);
  res.status(status).render("./Error.ejs", { err });
});

app.listen("8080", () => {
  console.log("Server running!");
});
