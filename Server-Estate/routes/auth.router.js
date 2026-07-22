const express = require("express");
const router = express.Router();
const { verfiyUser } = require("../utils/verifyUser");
const {SignUp , SignIn , GoogleAuth} = require("../controllers/auth.controller");
router.post("/signup" , SignUp);

router.post("/signin" , SignIn);

router.post("/google" , GoogleAuth);

router.get("/verify" , verfiyUser);
module.exports = router;