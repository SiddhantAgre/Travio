let express = require("express");
const mongoose = require("mongoose");
const app = express();
const Listing = require("../model/listing.js");
const initData = require("./data.js");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Travio");
}

main().then(() => {
    console.log("connected to DB");
});

app.get("/", (req, res) => {
  res.send("I am root!");
});

const insertData = async() => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
}

insertData();