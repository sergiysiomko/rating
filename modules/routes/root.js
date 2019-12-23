const express = require('express');
const router = express.Router();
const Subjects = require('../db/SubjectsSchema');
const dataManager = require('../db/DataManager');
const Comp = require('../computation');
const passport = require('passport');

router.get('/', async (req, res, next) => {
    //require('../db/datagen/datagen');
    let years = await Subjects.aggregate([  
        { "$group": {
                _id: {
                    
                    year: "$year"
                },
                semesters:{$addToSet:'$semester'}
            }
        },
        {
            '$sort':{ '_id.year':-1}
        }
        
    ])
    // format data
    years = years.map(y => {
        return {
            year: y._id.year,
            semesters : y.semesters.sort((a,b)=>b-a)
        }
    })
    
    res.render('index',{years, auth:req.isAuthenticated()})
})
router.get('/student/:card', async (req, res) => {
    const {card} =  req.params;
    let registers = await Subjects.find({
        'students_list.student.student_card':card
    }).sort({semester:-1})
    if(registers.length == 0){
        let message = 'Студента не знайдено';
        res.render('info', {message})
        return;
    }
    let semesters = Comp.groupBySemester(registers)
    semesters = semesters.map(s =>{
        let res = Comp.calcRatingList(s);
        res.student = res.list.find(l => l.student_card == card)
        delete res.list
        delete res.avg
        delete res.budgetAmount
        delete res.stipendAmount
        delete res.freePlace
        return res;
    })    
    res.render('student', {semesters, auth:req.isAuthenticated()})

})
router.get('/:year/:semester',async (req,res) => {
    
    let faculties = await Subjects.aggregate([
        {
            $match:{
                year: parseInt(req.params.year),
                semester: parseInt(req.params.semester),
                }
        },
         { "$group": {
             _id: {
                 faculty: "$faculty"
             },
             specialities:{$addToSet:'$speciality'},
         }}
     ])
     // format data
     faculties = faculties.map((f) => {
        let {faculty} = f._id;
        let specialities = f.specialities.map(s => {
            let {name, code} = s;
            let codeStr=code.toString();
            if(codeStr.length == 2){
                codeStr = '0'+codeStr
            }
            return { name, code, codeStr}
        }).sort((a,b) => a.code-b.code)// sort by speciality code

        return { faculty, specialities }
    }).sort((a, b) =>{// sort by faculty name
        if(a.faculty < b.faculty){
            return 1;
        }
        else if(a.faculty > b.faculty){
            return -1;
        }
        else{
            return 0;
        }
    })
    let href = `${req.params.year}/${req.params.semester}`;
    res.render('specialities',{faculties, href, auth:req.isAuthenticated()});
})
router.get('/:year/:semester/:code', async (req, res) => {
    let registers = await Subjects.find({
        year:parseInt(req.params.year),
        semester:parseInt(req.params.semester),
        'speciality.code':parseInt(req.params.code),
    })
    
    res.render('rating_list', {...Comp.calcRatingList(registers,42), auth:req.isAuthenticated()})
})
router.get('/data',(req,res) => {
    //require('../db/datagen/datagen');
    res.send('datagen')
})

module.exports = router;