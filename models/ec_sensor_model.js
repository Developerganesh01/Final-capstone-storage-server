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
const ec_sensor_model=mongoose.model('ec_sensor_model',schema);
module.exports=ec_sensor_model;