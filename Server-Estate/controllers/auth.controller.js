const Users =  require("../models/user");
const bcryptjs = require("bcryptjs");
const { ErrorHandler } = require("../utils/error");
const jwt = require("jsonwebtoken");



async function SignUp(req , res , next) {
  const {username , email , password} = req.body;
  try{
    const salt = await bcryptjs.genSalt(10)
    const hashPassword = await bcryptjs.hash(password , salt);
    await Users.create({
      username, 
      email, 
      password : hashPassword
    });
    res.status(201).json("User Created Successfully!"); s
  }catch(err){
    next(err);
  }
   
}


async function SignIn(req , res , next){
  const{email , password} = req.body;
  try{
    const validUser = await Users.findOne({email});
    if(!validUser){return next(ErrorHandler(404 , 'User Not Found'));}
    const validPassword = await bcryptjs.compare(password , validUser.password);
    if(!validPassword){return next(ErrorHandler(401 , 'Wrong credentials!'));}
    const token = jwt.sign({id : validUser._id} , process.env.JWT_TOKEN);
    const {password : pass , ...restUser} = validUser._doc;
    res.cookie('token' , token, {httpOnly: true})
    .status(200)
    .json(restUser);
  }catch(error){
    next(error);
  }
}


async function GoogleAuth(req , res , next){
  try{
    const user = await Users.findOne({email : req.body.email});
    if(user){
      const token = jwt.sign({id : user._id} , process.env.JWT_TOKEN);
      const {password , ...restUser} = user._doc;
      res.cookie('token' , token, {httpOnly: true})
      .status(200)
      .json(restUser);
    }else{
      const generatePassword = Math.random().toString(36).slice(-8);
      const salt = await bcryptjs.genSalt(10)
      const hashPassword = await bcryptjs.hash(generatePassword , salt);
      const newUser = await Users.create({
        username : req.body.username.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
        email : req.body.email,
        password : hashPassword,  
        avatar : req.body.photo,
      })
      const token = jwt.sign({id : newUser._id} , process.env.JWT_TOKEN);
      const {password , ...restUser} = newUser._doc;
      res.cookie('token' , token, {httpOnly: true})
      .status(200)
      .json(restUser);
    }
  }catch(err){
    next(err);
  }

}


module.exports = {
  SignUp,
  SignIn,
  GoogleAuth
}