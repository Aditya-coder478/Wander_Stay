if(process.env.NODE_ENV != "production"){
    require('dotenv').config({path: "../.env"});
}
const express = require("express");
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

let dbUrl = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/wonderlust";

main().then((req, res)=>{
    console.log("connection succesfull");
}).catch((err)=>{
    console.log(err);
})

async function main() {
    await mongoose.connect(dbUrl);
}

const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: "6a66e42cddb0228b33d275c7"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();