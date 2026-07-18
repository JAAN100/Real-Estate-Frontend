const express = require("express");
const router = express.Router();
const { createListing , deleteListing , updateListing} = require("../controllers/listing.controller"); 

router.post("/create" , createListing);

router.delete("/delete/:id" , deleteListing);


router.post("/update/:id" , updateListing);
module.exports = router;