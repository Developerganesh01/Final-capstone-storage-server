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
const h2o_temp_sensor_model=mongoose.model('h2o_temp_sensor_model',schema);
module.exports=h2o_temp_sensor_model;