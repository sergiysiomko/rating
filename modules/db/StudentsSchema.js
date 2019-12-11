const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentsSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    surname:{
        type:String,
        required:true
    },
    middle_name:{
        type:String,
        required:true
    },
    student_card:String,
    budget:{
        type:Boolean,
        required:true
    }
})

module.exports = StudentsSchema;