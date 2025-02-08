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
const dht_temp_sensor_model=mongoose.model('dht_temp_sensor_model',schema);
module.exports=dht_temp_sensor_model;