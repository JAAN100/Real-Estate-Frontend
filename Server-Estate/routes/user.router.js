const express = require("express");
const router = express.Router();
const { verfiyUser } = require("../utils/verifyUser");
const { updateUser , deleteUser , signOut , getUserListings , getUser} = require("../controllers/user.controllers");

router.post("/update/:id", verfiyUser, updateUser);

router.delete("/delete/:id", verfiyUser, deleteUser);

router.get("/signout",verfiyUser ,signOut);

router.get("/listing/:id" , verfiyUser, getUserListings);

router.get("/:id" , verfiyUser, getUser);

module.exports = router;

