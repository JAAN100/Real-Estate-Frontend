const {Schema , model} = require("mongoose");


const userSchema = Schema({
  name :{

  },
  email:{

  },
  age:{

  }
} , {timestamps : true});


const Users = model('mern-estate' , userSchema);

module.exports = Users;