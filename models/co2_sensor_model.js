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
const co2_sensor_model=mongoose.model('co2_sensor_model',co2schema);
module.exports=co2_sensor_model;