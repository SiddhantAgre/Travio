let express = require("express");
const mongoose = require("mongoose");
const app = express();
const Listing = require("./model/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const { log } = require("console");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Explorest");
}

main().then(() => {
  console.log("connected to DB");
});

app.get("/", (req, res) => {
  res.send("I am root!");
});

app.get("/listings", async (req, res) => {
  const listings = await Listing.find({});
  res.render("listings/views.ejs", { listings });
});

app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

app.post("/listings", async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
});

//edit route
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
});

//update route
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, {...req.body.listing});
  res.redirect(`/listings/${id}`)
});

//delete route
app.delete("/listings/:id", async (req, res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
})

//show route
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
});

app.listen("8080", () => {
  console.log("App running in the server!");
});
