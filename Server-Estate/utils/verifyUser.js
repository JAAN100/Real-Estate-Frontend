const { ErrorHandler } = require("./error");
const jwt =  require("jsonwebtoken");
function verfiyUser(req, res , next){
    const token = req.cookies.token;

    if(!token){
        next(ErrorHandler(401 , 'Unauthorized'));
    }
    jwt.verify(token , process.env.JWT_TOKEN , (err , user)=>{
        if(err){
            return next(ErrorHandler(403, "Forbidden"));
        }
        req.user = user;
        next();
    });
}


module.exports = {
    verfiyUser
}