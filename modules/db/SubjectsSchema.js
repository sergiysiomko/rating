const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentsSchema = require('./StudentsSchema');


const SubjectsShema = new Schema({
    subject_name:{ //⭐
        type:String,
        required:true
    },
    semester:{ //⭐
        type:Number,
        required:true
    },
    speciality:{ //⭐
        name:String,
        code:{
            type:Number,
            required:true
        }
    },
    year:{ //⭐
        type:Number,
        required:true
    },
    students_list:{
        type:[
            {
                student:{
                    type:StudentsSchema,
                    required:true
                },
                point:{
                    type:Number,
                    required:true,
                    min:1,
                    max:100
                },
                letter:String,
                group:String,
                
            }
        ],
        required:true
    },
    subject_type:{
        type:String,
        required:true // exam|credit
    },
    description:{
        type:String,
        default:''
    },
    coefficient:{
        type:Number,
        required:true
    },
    teacher:String,
    faculty:String, //⭐
    educational_level:String, // bachelor| magistr
    educational_form:String, // external | full
    budget_amount:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model('Subjects', SubjectsShema)