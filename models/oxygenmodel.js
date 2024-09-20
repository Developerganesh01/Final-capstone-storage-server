const mongoose=require('mongoose');
const oxygenschema=new mongoose.Schema({
    current_time:{
        type:Date,
        default:Date.now()
    },
    value:{
        type:Number,
        required:true
    }
});
const Oxygenmodel=mongoose.model('Oxygenmodel',oxygenschema);
module.exports=Oxygenmodel;