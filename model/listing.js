const mongoose = require("mongoose");
const Review = require("./review");

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
  review: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.review } });
  }
});

const listing = mongoose.model("Listing", listingSchema);

module.exports = listing;
