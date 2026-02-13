const mongoose = require("mongoose");
const initData = require("./data")
const Listing = require("../model/listing");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/travio");
}

main().then(() => {
  console.log("Database connected!");
});

async function demoData(){
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: '69894b96f72987920f9a78f9'}))
    await Listing.insertMany(initData.data);
}

demoData();