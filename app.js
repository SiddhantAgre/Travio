const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./model/listing");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const path = require("path");

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/travel");
}

main().then(() => {
  console.log("Database connected!");
});

function wrapAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(err => next(err));
  };
}

app.get("/", (req, res) => {
  res.send("I am the root route!");
});

// Show route
app.get("/listings", async (req, res) => {
  const listings = await Listing.find();
  res.render("./listings/show.ejs", { listings });
});

//Create route
app.get("/listings/new", (req, res) => {
  res.render("./listings/new.ejs");
});

app.post(
  "/listings",
  wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
  })
);

//Delete route
app.delete(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
  })
);

//edit route
app.get(
  "/listings/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("./listings/edit.ejs", { listing });
  })
);

//update route
app.put(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const newListing = await Listing.findByIdAndUpdate(id, {
      ...req.body.listing,
    });
    res.redirect(`/listings/${id}`);
  })
);

// view route
app.get(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("./listings/view.ejs", { listing });
  })
);

app.use((err, req, res, next) => {
  res.send("Something went wrong!");
});

app.listen("8080", () => {
  console.log("Server running!");
});
