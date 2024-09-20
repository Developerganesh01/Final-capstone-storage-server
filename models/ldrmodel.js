const express=require('express');
const mongoose=require('mongoose');
const ldrschema=new mongoose.Schema({
    current_time:{
        type:Date,
        default:Date.now()
    },
    value:{
        type:Number,
        required:true
    }
})
const Ldrmodel=mongoose.model('Ldrmodel',ldrschema);
module.exports=Ldrmodel;