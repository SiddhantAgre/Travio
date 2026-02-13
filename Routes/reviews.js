const express = require("express");
const router = express.Router();
const Review = require("../model/review");
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../model/listing");
const {validateReview, isLoggedIn} = require("../Middleware");

//add review route
router.post(
  "/:id/review",
  isLoggedIn,
  validateReview,
  wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = res.locals.currUser._id;
    listing.review.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "Review added!");
    console.log("Review added!");

    res.redirect(`/listings/${req.params.id}`);
  })
);

//delete review route
router.delete("/:id/review/:reviewId", wrapAsync(async (req, res) => {
  let {id, reviewId} = req.params;
  await Listing.findByIdAndUpdate(id, {$pull: {review: reviewId}})
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review deleted!");
  res.redirect(`/listings/${id}`);
}))

module.exports = router;