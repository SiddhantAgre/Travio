const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: {
      type: String,
      default:
        "https://media.istockphoto.com/id/1295744448/photo/guest-house-in-middle-of-natural-surroundings-of-coconut-tree-plantation-pollachi-tamil-nadu.webp?a=1&b=1&s=612x612&w=0&k=20&c=V4qtPawvcGof5p_QKTL1pfufgUnxyWDe8pvvpqjZIfs=",
        set: (v) =>
          v === ""
        ? "https://media.istockphoto.com/id/1295744448/photo/guest-house-in-middle-of-natural-surroundings-of-coconut-tree-plantation-pollachi-tamil-nadu.webp?a=1&b=1&s=612x612&w=0&k=20&c=V4qtPawvcGof5p_QKTL1pfufgUnxyWDe8pvvpqjZIfs="
        : v,
      },
  },
  price: {
    type: Number,
  },
  location: {
    type: String,
  },
  country: {
    type: String,
  },
});

const Listing = mongoose.model("listing", listingSchema);

module.exports = Listing;
