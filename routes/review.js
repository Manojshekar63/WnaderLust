const express = require("express");
const router=express.Router({ mergeParams: true });
const Listing=require("../models/listing.js");
const wrapAsync=require("../utils/wrapsync.js");
const {listingSchema ,reviewSchema}=require("../schema.js");
const ExpressError=require("../utils/expreererror.js");
const Review = require("../models/review.js");
const {validateReview, isLoggedIn}=require("../middleware.js");

//review routes
//post route
router.post("/", isLoggedIn,
   validateReview,
    wrapAsync(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  const newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  console.log(newReview);

  await newReview.save();
  listing.reviews.push(newReview._id);
  await listing.save();
  req.flash("success", "Created new review!");
  res.redirect(`/listings/${id}`);
}));


//delete review post route
router.delete("/:reviewId", isLoggedIn, wrapAsync(async (req, res) => {
  const { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Successfully deleted review");
  res.redirect(`/listings/${id}`);
}));
 
module.exports=router;