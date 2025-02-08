const mongoose=require('mongoose');
const tdsschema=new mongoose.Schema({
    current_time:{
        type:Date,
        default:Date.now()
    },
    value:{
        type:Number,
        required:true
    }
});
const tds_sensor_model=mongoose.model('tds_sensor_model',tdsschema);
module.exports=tds_sensor_model;