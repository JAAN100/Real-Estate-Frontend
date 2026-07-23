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



app.use(async (req, res, next) => {
  try {
    await ConnectedToMongoDB(process.env.MONGO_URI);
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());


app.get("/" , (req,res)=>{
  return res.json({New : "Welcome to the Real Estate API"});
});
app.use("/api/auth" , authRouter);
app.use("/api/user" ,userRouter);
app.use("/api/listing" , listingRouter);

app.use(AuthMiddleWare);

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log("Connected to the Server"));
}
module.exports = app;