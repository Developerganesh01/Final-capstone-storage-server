const mongoose=require('mongoose');
const ultrasonicschema=new mongoose.Schema({
    current_time:{
        type:Date,
        default:Date.now()
    },
    value:{
        type:Number,
        required:true
    }
});
const Ultrasonicmodel=mongoose.model('Ultrasonicmodel',ultrasonicschema);
module.exports=Ultrasonicmodel;