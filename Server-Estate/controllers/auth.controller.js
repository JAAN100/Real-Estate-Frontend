const Users =  require("../models/user");
const bcryptjs = require("bcryptjs");
async function SignUp(req , res) {
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
    res.status(500).json(err.message);
  }
   
}


module.exports = {
  SignUp,

}