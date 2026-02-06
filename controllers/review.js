const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

module.exports.createReview= async (req, res) => {
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
};

module.exports.destroyReview= async (req, res) => {
  const { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Successfully deleted review");
  res.redirect(`/listings/${id}`);
};