const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./model/listing");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const path = require("path");
const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/ExpressError");
const { listingSchema, reviewSchema } = require("./ValidateSchema");
const Review = require("./model/review");

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

function validateListing(req, res, next) {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    const errMsg = error.details[0].message;
    console.log(error);
    next(new ExpressError(400, errMsg));
  } else {
    next();
  }
}

function validateReview(req, res, next) {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    const errMsg = error.details[0].message;
    console.log(errMsg);
    next(new ExpressError(400, errMsg));
  } else {
    next();
  }
}

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/travio");
}

main().then(() => {
  console.log("Database connected!");
});

app.get("/", (req, res) => {
  res.send("I am the root route!");
});

// Show route
app.get("/listings", async (req, res) => {
  const listings = await Listing.find();
  res.render("./listings/index.ejs", { listings });
});

//Create route
app.get("/listings/new", (req, res) => {
  res.render("./listings/new.ejs");
});

//New route
app.post(
  "/listings",
  wrapAsync(async (req, res) => {
    (req.body.listing.image = {
      url: req.body.listing.image,
      filename: "listingimage",
    }),
      validateListing;
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
  validateListing,
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
    let listing = await Listing.findById(id).populate("review");
    res.render("./listings/show.ejs", { listing });
  })
);

//reviews
//review route
app.post(
  "/listings/:id/review",
  validateReview,
  wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    listing.review.push(newReview);

    await newReview.save();
    await listing.save();

    console.log("Review added!");

    res.redirect(`/listings/${req.params.id}`);
  })
);

//delete review route
app.delete("/listings/:id/review/:reviewId", wrapAsync(async (req, res) => {
  let {id, reviewId} = req.params;
  await Listing.findByIdAndUpdate(id, {$pull: {review: reviewId}})
  await Review.findByIdAndDelete(reviewId);
  res.redirect(`/listings/${id}`);
}))
//middlewares
app.use((err, req, res, next) => {
  let { status = 500, message = "Something went wrong" } = err;
  console.log(err);
  res.status(status).render("./Error.ejs", { err });
});

app.listen("8080", () => {
  console.log("Server running!");
});
