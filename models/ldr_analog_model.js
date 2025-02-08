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
const ldr_analog_sensor_model=mongoose.model('ldr_analog_sensor_model',schema);
module.exports=ldr_analog_sensor_model;