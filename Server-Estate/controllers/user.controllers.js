const User = require("../models/user");
const Listing = require("../models/listing");
const bcryptjs = require("bcryptjs");
const { ErrorHandler } = require("../utils/error");
async function updateUser(req, res , next) {
    if(req.user.id !== req.params.id){
        return next(ErrorHandler(401 , 'You cannot update this account data!!'));
    }
    try {
        if(req.body.password){
            const salt = await bcryptjs.genSalt(10);
            req.body.password = await bcryptjs.hash(req.body.password , salt);
        }
        const updateUser = await User.findByIdAndUpdate(req.params.id , 
            {$set : {  
                username : req.body.username , 
                email : req.body.email , 
                password : req.body.password ,
                avatar : req.body.avatar}} , 
            { returnDocument: "after"});
        const {password , ...rest} = updateUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
    
}


async function deleteUser(req, res , next) {
    if(req.user.id !== req.params.id){
        return next(ErrorHandler(401 , 'You cannot delete this account data!!'));
    }
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie("token");
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        next(error);
    }
}

async function signOut(req, res , next) {
    try {     
    res.clearCookie("token");
    res.status(200).json({ message: "Signed out successfully" });
    } catch (error) {
        next(error);
    }}
async function getUserListings(req, res , next) {
    if(req.user.id !== req.params.id){
       return next(ErrorHandler(401 , 'You cannot access this account data!!'));
    }
    try {
        const listing = await Listing.find({ userRef: req.params.id });
        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
}

async function getUser(req, res , next) {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const {password: pass , ...rest} = user._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}   
module.exports = { updateUser, deleteUser, signOut , getUserListings , getUser};