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

async function getListings(req, res , next) {
    try {
        const limit = parseInt(req.query.limit) || 6;
        const start = parseInt(req.query.start) || 0;
        let offer = req.query.offer;
        if(offer === undefined || offer === false){
            offer = {$in : [false , true]};
        } 
        let furnished = req.query.furnished;
        if(furnished === undefined || furnished === false){
            furnished = {$in : [false , true]};
        }
        let parking = req.query.parking;
        if(parking === undefined || parking === false){
            parking = {$in : [false , true]};
        }
        let type = req.query.type;
        if(type === undefined || type === 'all'){
            type = {$in : ["rent" , "sale"]};
        }
        const searchTerm = req.query.searchTerm || '';
        const sort = req.query.sort || 'createdAt';
        const order = req.query.order || 'desc';
        const listing = await Listing.find({
            name :{$regex : searchTerm, $options : "i"},
            offer,
            furnished,
            parking,
            type
        }).sort({[sort] : order}).skip(start).limit(limit);
        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
}
module.exports = {
    createListing,
    deleteListing,
    updateListing,
    getListing,
    getListings
}