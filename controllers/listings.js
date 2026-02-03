const Listings= require("../models/listing.js");

module.exports.index= async (req, res) => {
  const allListings = await Listings.find({});
  res.render("listings/index.ejs", { allListings });
}

module.exports.renderNewForm= (req, res) => {
  res.render("listings/new.ejs");
}

module.exports.showListing= async (req, res) => {
  const { id } = req.params;
  const listing = await Listings.findById(id)
  .populate({
    path:"reviews",
  populate:{
    path:"author",
  },
})
  .populate("owner");

  if(!listing){
    req.flash("error","Cannot find that listing!");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing= async (req, res, next) => {
  const newListing = new Listings(req.body.listing);
  newListing.owner = req.user._id;
  await newListing.save();
  req.flash("success", "Successfully made a new listing!");
  res.redirect("/listings");
};

module.exports.renderEditForm= async (req, res) => {
  let { id } = req.params;
  const listing = await Listings.findById(id);
  if(!listing){
    req.flash("error","Cannot find that listing!");
    return res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { listing });
};

module.exports.updateListing= async (req, res) => {
  let { id } = req.params;
  await Listings.findByIdAndUpdate(id, { ...req.body.listing });
  req.flash("success", "Successfully updated listing!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing= async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listings.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Successfully deleted listing");
  res.redirect("/listings");
};