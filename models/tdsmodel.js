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
const Tdsmodel=mongoose.model('Tdsmodel',tdsschema);
module.exports=Tdsmodel;