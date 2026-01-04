const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
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
  price: { type: Number, required: true },
  country: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

const listing = mongoose.model("listing", listingSchema);

module.exports = listing;
