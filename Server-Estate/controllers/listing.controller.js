const Listing = require("../models/listing");
const {ErrorHandler} = require("../utils/error");
async function createListing(req, res , next) {
    try {
        const listing = await Listing.create({ ...req.body, userRef:req.user.id });
        res.status(201).json(listing);
    } catch (error) {
        next(error);    
    }
}

async function deleteListing(req, res , next) {
    const checkListing = await Listing.findById(req.params.id);
    if(!checkListing){
        return next(ErrorHandler(404 , "Listing not found"));
    }
    if(req.user.id !== checkListing.userRef.toString()){
        return next(ErrorHandler(401 , "You are not authorized to delete this listing"));
    }
    try {
        await Listing.findByIdAndDelete(req.params.id);
        const listing = await Listing.find({ userRef: req.user.id });
        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
}


async function updateListing(req, res , next) {
    const checkListing = await Listing.findById(req.params.id);
    if(!checkListing){
        return next(ErrorHandler(404 , "Listing not found"));
    }
    if(req.user.id !== checkListing.userRef.toString()){
        return next(ErrorHandler(401 , "You are not authorized to update this listing"));
    }
    try {
        const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body,  { returnDocument: "after"});
        res.status(200).json(updatedListing);
    } catch (error) {
        next(error);
    }

}

async function getListing(req, res , next) {
    try {
        const listing = await Listing.findById(req.params.id);        
        if(!listing){
            return next(ErrorHandler(404 , "Listing not found"));
        } 
        res.status(200).json(listing);
    }catch (error) {
        next(error);
    }
}      
module.exports = {
    createListing,
    deleteListing,
    updateListing,
    getListing
}