const express=require("express");
const router=express.Router();
const Listing=require("../models/listing.js");
const wrapAsync=require("../utils/wrapsync.js");
const {listingSchema ,reviewSchema}=require("../schema.js");
const ExpressError=require("../utils/expreererror.js");
const {isLoggedIn}=require("../middleware.js");
const {isOwner}=require("../middleware.js");
const {validateListing}=require("../middleware.js");
const listingcontroller=require("../controllers/listings.js");

  //Index Route
  router.get("/", wrapAsync(listingcontroller.index));


//New Route
router.get("/new", 
  isLoggedIn,
  listingcontroller.renderNewForm);

//Show Route
router.get("/:id", wrapAsync(listingcontroller.showListing  ));
//Create Route
router.post("/",
  isLoggedIn, 
  validateListing,
   wrapAsync( listingcontroller.createListing ));

//Edit Route
    router.get("/:id/edit",
       isLoggedIn, 
       isOwner,
        listingcontroller.renderEditForm
      );

//Update Route
router.put("/:id",
   isLoggedIn,
   isOwner, 
   validateListing,
    wrapAsync(listingcontroller.updateListing ));

//Delete Route
router.delete("/:id", 
  isLoggedIn, 
  isOwner,
   wrapAsync( listingcontroller.destroyListing ));
module.exports=router;








