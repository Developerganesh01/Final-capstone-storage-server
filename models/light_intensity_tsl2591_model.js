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
const light_intensity_tsl2591_sensor_model=mongoose.model('light_intensity_tsl2591_sensor_model',schema);
module.exports=light_intensity_tsl2591_sensor_model;