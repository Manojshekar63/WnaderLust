const Listing = require("./models/listing");
const { listingSchema ,reviewSchema } = require("./schema.js");
const ExpressError = require("./utils/expreererror.js");

module.exports.isLoggedIn = (req, res, next) => {
   if(!req.isAuthenticated()){
    req.session.redirectUrl = req.originalUrl;
    req.flash("error","You must be signed in first!");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl =(req,res,next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner=async(req,res,next)=>{
  const {id}=req.params;
  const listing=await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","You are not the Owner of this listing!");
        return res.redirect(`/listings/${id}`);
    }

    next();
};

module.exports.validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    throw new ExpressError(error.message, 400);
  }
  next();
};

module.exports.validateReview = (req, res, next) => {
    
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    throw new ExpressError(error.message, 400);
  }
  next();
};
