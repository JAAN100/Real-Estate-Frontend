const express = require("express");
const router = express.Router();
const Users = require("../models/user");

router.post("/signup" , async(req , res)=>{
  const {username , email , password} = req.body;
  const user = await Users.create({username , email , password});
  return res.json(user);
})

module.exports = router;