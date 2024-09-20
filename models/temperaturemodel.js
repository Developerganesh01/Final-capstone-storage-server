const mongoose=require('mongoose');
const temperatureschema=new mongoose.Schema({
    current_time:{
        type:Date,
        default:Date.now()
    },
    value:{
        type:Number,
        required:true
    }
});
const Temperaturemodel=mongoose.model('Temperaturemodel',temperatureschema);
module.exports=Temperaturemodel;