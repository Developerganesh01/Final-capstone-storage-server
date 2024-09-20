const mongoose=require('mongoose');
const phschema=new mongoose.Schema({
    current_time:{
        type:Date,
        default:Date.now()
    },
    value:{
        type:Number,
        required:true
    }
});
const Phmodel=mongoose.model('Phmodel',phschema);
module.exports=Phmodel;