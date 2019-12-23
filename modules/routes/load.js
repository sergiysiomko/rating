const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const passport = require('passport');
const Subjects = require('../db/SubjectsSchema');
const upload = multer({dest:"uploads"});

//  /load

router.get('/file', passport.isLoggedIn, (req, res) => {
   
    res.render('load_file',{auth:req.isAuthenticated()});
})
router.post('/file', passport.isLoggedIn, upload.single("filedata"), async (req, res) => {
    if (req.file == undefined) {
        res.render('info',{message:"Файл не обрано"})
        return;
    }
    let data = fs.readFileSync(path.join('E:/web/diploma/rating/uploads', req.file.filename), 'utf-8')
    data = csvJSON(data);
    
    let subj = {
        subject_name:data[0].subject_name,
        semester:data[0].semester,
        speciality:{
            name:data[0].speciality__name,
            code:data[0].speciality__code
        },
        year:data[0].year,
        students_list:data.map((s) => {
            return {
                student:{
                    surname: s.students_list__student__surname,
                    name: s.students_list__student__name,
                    middle_name: s.students_list__student__middle_name,
                    budget: boolParse(s.students_list__student__budget),
                    student_card: s.students_list__student__student_card
                },
                point: s.students_list__point,
                letter: s.students_list__letter,
                group: s.students_list__group
            }
        }),
        subject_type:data[0].subject_type,
        description:data[0].description,
        coefficient:data[0].coefficient,
        teacher:data[0].teacher,
        faculty:data[0].faculty,
        educational_level:data[0].educational_level,
        educational_form:data[0].educational_form,
        budget_amount:data[0].budget_amount,
        
    }
    
    let s  = new Subjects(subj)
    
    await s.save();

    
    res.send(s);
})

module.exports = router;

function csvJSON(csv) {
    const lines = csv.split('\n')
    const result = []
    const headers = lines[0].split(',')

    for (let i = 0; i < headers.length; i++) {
        headers[i] = parseBrek(headers[i]);
        
    }
    for (let i = 1; i < lines.length; i++) {        
        if (!lines[i])
            continue
        const obj = {}
        const currentline = lines[i].split(',')
        
        for (let j = 0; j < headers.length; j++) {
           let curr = parseBrek(currentline[j])
            if(curr){
                obj[headers[j]] = curr;
            }
             
        }
        result.push(obj)

    }
    return result
     /*
    {
  subject_name: 'Українська мова',
  semester: '1',
  speciality__name: 'Менеджмент',
  speciality__code: '73',
  year: '2025',
  students_list__student__surname: '﻿Лютенкова',
  students_list__student__name: 'Светлана',
  students_list__student__middle_name: 'Тихоновна',
  students_list__student__budget: 'False',
  students_list__student__student_card: 'ТМ №27752413',
  students_list__point: '96',
  students_list__letter: 'A',
  students_list__group: 'МНД-1',
  subject_type: 'credit',
  coefficient: '1',
  teacher: 'Москвин Якуб Владиславович',
  faculty: 'Факультет економіки та менеджменту',
  educational_level: 'bachelor',
  educational_form: 'full',
  budget_amount: '8'
} */
}
function parseBrek(str){
    let cl = str.split('"');
    
    if(cl.length == 3 && cl[1] != '' && cl[1] != '\r'){
        return cl[1];
    }
    else if(cl.length != 3)
        return str;
    else 
        return undefined
}
function boolParse(str){
    if(str.toUpperCase() == 'TRUE'){
        return true;
    }
    return false;
}