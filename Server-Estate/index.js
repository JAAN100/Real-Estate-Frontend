const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const cookieParser = require("cookie-parser");


const PORT = 8000;
const authRouter = require("./routes/auth.router");
const userRouter = require("./routes/user.router");
const listingRouter = require("./routes/listing.route");

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
app.use(cookieParser());


app.use("/api/auth" , authRouter);
app.use("/api/user" ,userRouter);
app.use("/api/listing" , listingRouter);

app.use(AuthMiddleWare);

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log("Connected to the Server"));
}
module.exports = app;