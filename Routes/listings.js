const express = require("express");
const Listing = require("../model/listing");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { listingSchema } = require("../ValidateSchema");
const ExpressError = require("../utils/ExpressError");
const {isLoggedIn} = require("../Middleware");

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

// Show route
router.get("/", async (req, res) => {
  const listings = await Listing.find();
  res.render("./listings/index.ejs", { listings });
});

//Create route
router.get("/new", isLoggedIn, (req, res) => {
  res.render("./listings/new.ejs");
});

//New route
router.post(
  "/",
  wrapAsync(async (req, res) => {
    ((req.body.listing.image = {
      url: req.body.listing.image,
      filename: "listingimage",
    }),
      validateListing);
    req.flash("success", "listing added!");
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
  }),
);

//Delete route
router.delete(
  "/:id",
   isLoggedIn,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "listing deleted!");
    res.redirect("/listings");
  }),
);

//edit route
router.get(
  "/:id/edit",
   isLoggedIn,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "The listing you are looking for does not exist!");
      return res.redirect("/listings");
    }
    res.render("./listings/edit.ejs", { listing });
  }),
);

//update route
router.put(
  "/:id",
   isLoggedIn,
  validateListing,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, {
      ...req.body.listing,
    });
    req.flash("success", "listing edited!");
    res.redirect(`/listings/${id}`);
  }),
);

// view route
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate("review");
    if (!listing) {
      req.flash("error", "The listing you are looking for does not exist!");
      return res.redirect("/listings");
    }
    res.render("./listings/show.ejs", { listing });
  }),
);

module.exports = router;
