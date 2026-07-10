const {Schema , model} = require("mongoose");


const userSchema = Schema({
  username :{
    type:String,
    required:true,
    unique:true
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type:String,
    required:true,
  },
  avatar:{
    type: String,
    default: "https://www.flaticon.com/free-icon/avatar_3781986"
  }
} , {timestamps : true});


const Users = model('mern-estate' , userSchema);

module.exports = Users;