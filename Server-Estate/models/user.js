const {Schema , model} = require("mongoose");


const userSchema = Schema({
  name :{
    type:String,
    required:true,
    unique:true
  },
  username:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type:String,
    required:true,
  }
} , {timestamps : true});


const Users = model('mern-estate' , userSchema);

module.exports = Users;