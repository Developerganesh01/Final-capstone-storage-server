const mongoose=require('mongoose');
const schema=new mongoose.Schema({
    current_time:{
        type:Date,
        default:Date.now()
    },
    value:{
        type:Number,
        required:true
    }
});
const pressure_sensor_model=mongoose.model('pressure_sensor_model',schema);
module.exports=pressure_sensor_model;