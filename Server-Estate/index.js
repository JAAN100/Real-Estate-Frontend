const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = 8000;

const {ConnectedToMongoDB} = require("./connection/connection"); 
const Users = require("./models/user");

ConnectedToMongoDB(process.env.MONGO_URI)
.then(()=>{console.log("Connected to MongoDB");
}).catch((err)=>{console.log(err);
})

app.use(cors(()=>{
  origin:'http://localhost:5173/';
}))
app.use(express.json());



app.use();



app.listen(PORT , ()=>{console.log("Connected to the Server");
})