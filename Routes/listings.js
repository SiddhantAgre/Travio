const express = require("express");
const Listing = require("../model/listing");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner, validateListing } = require("../Middleware");

router
  .route("/")
  .get(async (req, res) => {
    const listings = await Listing.find();
    res.render("./listings/index.ejs", { listings });
  })
  .post(
    wrapAsync(async (req, res) => {
      ((req.body.listing.image = {
        url: req.body.listing.image,
        filename: "listingimage",
      }),
        validateListing);
      req.flash("success", "listing added!");
      const newListing = new Listing(req.body.listing);
      newListing.owner = req.user;
      await newListing.save();
      res.redirect("/listings");
    }),
  );

//Create route
router.get("/new", isLoggedIn, (req, res) => {
  res.render("./listings/new.ejs");
});

router
  .route("/:id")
  .delete(
    isLoggedIn,
    isOwner,
    wrapAsync(async (req, res) => {
      let { id } = req.params;
      await Listing.findByIdAndDelete(id);
      req.flash("success", "listing deleted!");
      res.redirect("/listings");
    }),
  )
  .put(
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(async (req, res) => {
      let { id } = req.params;
      await Listing.findByIdAndUpdate(id, {
        ...req.body.listing,
      });
      req.flash("success", "listing edited!");
      res.redirect(`/listings/${id}`);
    }),
  )
  .get(
    wrapAsync(async (req, res) => {
      let { id } = req.params;
      let listing = await Listing.findById(id).populate({
        path: "review",
        populate: { path: "author" },
      });
      if (!listing) {
        req.flash("error", "The listing you are looking for does not exist!");
        return res.redirect("/listings");
      }
      res.render("./listings/show.ejs", { listing });
    }),
  );

//edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
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

module.exports = router;
