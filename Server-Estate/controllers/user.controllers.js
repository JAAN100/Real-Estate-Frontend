const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { ErrorHandler } = require("../utils/error");
async function updateUser(req, res) {
    if(req.user.id !== req.params.id){
        next(ErrorHandler(401 , 'You cannot update this account data!!'));
    }
    try {
        if(req.body.password){
            const salt = await bcryptjs.genSalt(10);
            req.body.password = bcryptjs.hash(req.body.password , salt);
        }
        const updateUser = await User.findByIdAndUpdate(req.params.id , 
            {$set : {  
                username : req.body.username , 
                email : req.body.email , 
                password : req.body.password ,
                avatar : req.body.avatar}} , 
            {new : true});
        const {password , ...rest} = updateUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
    
}

module.exports = { updateUser };