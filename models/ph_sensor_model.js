const mongoose=require('mongoose');
const phschema=new mongoose.Schema({
    current_time:{
        type:Date,
    },
    value:{
        type:Number,
        required:true
    }
});
const ph_sensor_model=mongoose.model('ph_sensor_model',phschema);
module.exports=ph_sensor_model;