const mongoose=require('mongoose');
const PlaceSchema=new mongoose.Schema({
    owner:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    title:String,
    address:String,
    photos:[String],
    desc:String,
    perks:[String],
    extrainfo:String,
    checkin:Number,
    checkout:Number,
    maxguests:Number,
    price:Number,
});
const PlaceModel=mongoose.model('Place',PlaceSchema);
module.exports=PlaceModel;