const mongoose=require('mongoose');
const barometerschema=new mongoose.Schema({
    current_time:{
        type:Date,
        default:Date.now()
    },
    value:{
        type:Number,
        required:true
    }
});
const Barometermodel=mongoose.model('Barometermodel',barometerschema);
module.exports=Barometermodel;