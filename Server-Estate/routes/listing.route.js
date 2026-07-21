const express = require("express");
const router = express.Router();
const { verfiyUser } = require("../utils/verifyUser");
const { createListing , deleteListing , updateListing , getListing , getListings} = require("../controllers/listing.controller"); 

router.post("/create" , verfiyUser, createListing);

router.delete("/delete/:id" , verfiyUser, deleteListing);


router.post("/update/:id" , verfiyUser, updateListing);


router.get("/get/:id" , getListing);


router.get("/get" , getListings);

module.exports = router;