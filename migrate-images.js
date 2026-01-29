const mongoose = require("mongoose");
const Listing = require("./models/listing.js");

async function migrateImages() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
  
  const listings = await Listing.find({});
  console.log(`Found ${listings.length} listings\n`);
  
  const defaultImage = "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60";
  
  let updated = 0;
  
  for (let listing of listings) {
    let needsUpdate = false;
    let newImage = listing.image;
    
    // Case 1: image is undefined or null
    if (!listing.image) {
      newImage = defaultImage;
      needsUpdate = true;
      console.log(`❌ ${listing.title}: undefined → default image`);
    }
    // Case 2: image is an object with url property
    else if (typeof listing.image === 'object' && listing.image.url) {
      newImage = listing.image.url;
      needsUpdate = true;
      console.log(`🔧 ${listing.title}: object → ${newImage}`);
    }
    // Case 3: image is a stringified object
    else if (typeof listing.image === 'string' && listing.image.includes('filename:')) {
      const match = listing.image.match(/url: '([^']+)'/);
      if (match) {
        newImage = match[1];
        needsUpdate = true;
        console.log(`🔧 ${listing.title}: stringified object → ${newImage}`);
      } else {
        newImage = defaultImage;
        needsUpdate = true;
        console.log(`❌ ${listing.title}: invalid stringified object → default image`);
      }
    }
    // Case 4: already a valid URL string
    else if (typeof listing.image === 'string' && listing.image.startsWith('http')) {
      console.log(`✅ ${listing.title}: already valid URL`);
    }
    // Case 5: invalid string (not a URL)
    else {
      newImage = defaultImage;
      needsUpdate = true;
      console.log(`❌ ${listing.title}: "${listing.image}" → default image`);
    }
    
    if (needsUpdate) {
      // Update directly in database to bypass schema validation issues
      await Listing.updateOne(
        { _id: listing._id },
        { $set: { image: newImage } }
      );
      updated++;
    }
  }
  
  console.log(`\n✅ Migration complete! Updated ${updated} out of ${listings.length} listings.`);
  mongoose.connection.close();
}

migrateImages();