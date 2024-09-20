const mongoose=require('mongoose');
const co2schema=new mongoose.Schema({
    current_time:{
        type:Date,
        default:Date.now()
    },
    value:{
        type:Number,
        required:true
    }
});
const Co2model=mongoose.model('Co2model',co2schema);
module.exports=Co2model;