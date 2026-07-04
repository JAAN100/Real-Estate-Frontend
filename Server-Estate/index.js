const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = 8000;
const userRouter = require("./routes/auth.router");
const {ConnectedToMongoDB} = require("./connection/connection"); 
const { AuthMiddleWare } = require("./middlewares/error.middleware");


ConnectedToMongoDB(process.env.MONGO_URI)
.then(()=>{console.log("Connected to MongoDB");
}).catch((err)=>{console.log(err);
})

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use("/api/auth" , userRouter);

app.use(AuthMiddleWare);

app.listen(PORT , ()=>{console.log("Connected to the Server");
})