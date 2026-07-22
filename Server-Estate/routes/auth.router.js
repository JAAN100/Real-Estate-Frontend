const express = require("express");
const router = express.Router();
const {SignUp , SignIn , GoogleAuth} = require("../controllers/auth.controller");
router.post("/signup" , SignUp);

router.post("/signin" , SignIn);

router.post("/google" , GoogleAuth);

router.get("/verify" , (req,res) => {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({success : false , message : "Unauthorized"});
    }else{
        return res.status(200).json({success : true , message : "Authorized"});
    }
});
module.exports = router;