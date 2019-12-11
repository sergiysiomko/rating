const express = require('express');
const router = express.Router();

const dataManager = require('../db/DataManager');

router.get('/', async (req, res, next) => {
    let subj = {
        subject_name:'ММДО',
        semester:4,
        speciality:{
            name:"ПІ",
            code:121
        },
        year:2019,
        students_list:[
            {
                student:{name:"Pavlik", middle_name:"Anatoliyovich", surname:"Trush"},
                point:90,
                letter:'A',
                group:'ПІ-45',
                budget:true
            },
            {
                student:{name:"Sasha", middle_name:"Vladimirovich", surname:"Step"},
                point:80,
                letter:'C',
                group:'ПІ-45',
                budget:true
            }
        ],
        
        subject_type:'exam',
        description:'Дуже складний предмет',
        coefficient:2,
        teacher:"Ярумчук Світлана",
        faculty:"ФІКТ",
        educational_level:'bachelor',
        educational_form:'full',
        budget_amount:5
    }
    let [err, s]  = [1,1]//= await dataManager.saveSubject(subj)
    if(err){
        res.render('error', { message: err});
    }
    else{
        res.render('index', { msg: s.students_list[0] });
    }
    
})
router.get('/data', async (req, res, next) => {
    //require('../db/datagen/datagen');
    res.render('index',{msg:'asdf'})
})

module.exports = router;