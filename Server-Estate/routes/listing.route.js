const express = require("express");
const router = express.Router();
const { createListing , deleteListing} = require("../controllers/listing.controller"); 

router.post("/create" , createListing);

router.delete("/delete/:id" , deleteListing);

module.exports = router;