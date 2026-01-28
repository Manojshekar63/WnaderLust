const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");

// register ejs-mate BEFORE routes
const engine = require('ejs-mate');
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// MongoDB connection URL
const mongo_url = "mongodb://127.0.0.1:27017/wanderlust";

// Connect to MongoDB
async function main() {
    // use mongoose to connect to the DB
    await mongoose.connect(mongo_url);
}
main()
  .then(() => {
    console.log("Connected to db");
  })
  .catch(err => {
    console.error("DB connection error:", err);
  });

app.use(methodOverride("_method"));

// Middleware to parse JSON bodies (useful for POST requests)
app.use(express.json());

// add this so form submissions (application/x-www-form-urlencoded) are parsed
app.use(express.urlencoded({ extended: true }));
//update route
app.put("/listings/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, imageUrl, price, location, country } = req.body;
  
  await Listing.findByIdAndUpdate(id, {
    title,
    description,
    image: { url: imageUrl },
    price,
    location,
    country
  });
  
  res.redirect(`/listings/${id}`);
});
//delete route
app.delete("/listings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    if (!deletedListing) {
      return res.status(404).send("Listing not found");

    }
    return res.redirect("/listings");
  } catch (err) {
    console.error("Error deleting listing:", err);
    return res.status(500).send("Error deleting listing");
  }
});

//new route 
app.get("/listings/new", (req, res) => {
  res.render("listings/new");

});
//edit route
app.get("/listings/:id/edit", async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).send("Listing not found");
    }
    return res.render("listings/edit", { listing });
  } catch (err) {
    console.error("Error fetching listing for edit:", err);
    return res.status(500).send("Error fetching listing for edit");
  }
});

// Create route: map posted fields to the Listing schema
app.post("/listings", async (req, res) => {
  try {
    const { title, description, imageUrl, price, location, country } = req.body;
    // The Listing schema expects `image` as an object { filename, url }
    const newListing = new Listing({
      title,
      description,
      image: imageUrl ? { filename: "listingimage", url: imageUrl } : undefined,
      price,
      location,
      country,
    });
    await newListing.save();
    res.redirect("/listings");
  } catch (err) {
    console.error("Error creating listing:", err);
    res.status(500).send("Error creating listing");
  }
});

// index Route - return all listings as JSON
app.get("/listings", async (req, res) => {
  try {
    const alllistings = await Listing.find({});
    // send listings to client
    res.render("listings/index", { listings: alllistings, layout: 'layouts/boilerplate' });
  } catch (err) {
    console.error("Error fetching listings:", err);
    return res.status(500).json({ error: "Failed to fetch listings" });
  }
});

// show route
app.get("/listings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).send("Listing not found");
    }
    res.render("listings/show", { listing, layout: 'layouts/boilerplate' });
  } catch (err) {
    console.error("Error fetching listing by ID:", err);
    return res.status(500).json({ error: "Failed to fetch listing" });
  }
});

/*
  Route: GET /testlisting
  Creates a sample Listing document and saves it to MongoDB.
*/
// app.get("/testlisting", async (req, res) => {
//   try {
//     const newListing = new Listing({
//       title: "Cozy Cottage",
//       description: "A cozy cottage in the countryside",
//       image: "",
//       price: 120,
//       location: "Countryside",
//       country: "USA", // <-- fixed field name to match schema
//     });

//     // Save the document to the database
//     await newListing.save();

//     res.send("Listing saved successfully");
//   } catch (err) {
//     console.error("Error saving listing:", err);
//     res.status(500).send("Error saving listing");
//   }
// });

// Simple root route
app.get("/", (req, res) => {
  res.send("hi, i am manoj");
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});