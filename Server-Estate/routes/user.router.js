const express = require("express");
const router = express.Router();
const { updateUser , deleteUser , signOut , getUserListings} = require("../controllers/user.controllers");

router.post("/update/:id", updateUser);

router.delete("/delete/:id", deleteUser);

router.get("/signout", signOut);

router.get("/listing/:id" , getUserListings);

module.exports = router;

