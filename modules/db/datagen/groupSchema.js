const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupsSchema = new Schema({
    group_name:{
        type:String,
        required:true
    },
    amount_budget:String,
    faculty:String,
    speciality:{
        name:String,
        code:{
            type:Number,
            required:true
        }
    },
    students:[{

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
        
    }]
})

module.exports = mongoose.model('Groups', GroupsSchema);