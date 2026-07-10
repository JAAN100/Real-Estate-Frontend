const express = require("express");
const router = express.Router();
const {SignUp , SignIn , GoogleAuth} = require("../controllers/auth.controller");


router.post("/signup" , SignUp);

router.post("/signin" , SignIn);

router.post("/google" , GoogleAuth);

module.exports = router;