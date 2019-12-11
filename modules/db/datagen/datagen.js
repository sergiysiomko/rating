const dm = require('../DataManager');
const inputData = require('./inputData');
const Groups = require('./groupSchema');
const Subjects = require('../SubjectsSchema');

function NamesProvider(){
    this.counter = 0;
    this.data = inputData.getNames();
    this.getNext = function(){
        return this.data[this.counter++]
    }
    this.rate = function(){
        return this.counter/this.data.length;
    }
}
(() => {
    let yearStart = 2014
    let yearEnd = 2018
    let namesProvider = new NamesProvider()
    let streamCounter = 0
    inputData.FACULTIES.forEach((f) => {
        f.spec.forEach( (s) => {
            for (let j = 0; j < 4; j++) {
                
                
                // create stream fo every speciality
                let stream = genStream(f.faculty,s,namesProvider)
                let year = yearStart+j;
                for (let i = 1; i < (yearEnd-yearStart)*2; i++) {
                    let s = genSemester(stream, i, year)
                    Subjects.insertMany(s)
                    year++;
                    i++;
                    s = genSemester(stream,i, year)
                    Subjects.insertMany(s)
                }
                streamCounter++;
            }
            
        })
     })
     console.log(namesProvider.counter);
     console.log(namesProvider.rate());
     console.log('streams: ', streamCounter);
})()
function genSemester(stream, semester, year){
    let subjectNames= genRandomDisceplines();
    let subjectRegisters = [];
    let {speciality, faculty} = stream[0];
    const subjectTypes = {1 :'credit', 2:'exam'}
    let coff = getRandomInt(1,3);
    const students_list = genStudentsRegisters(stream);
    let budget_amount = sumBudget(stream)
    let teacher = inputData.TEACHER_NAMES[getRandomInt(0,inputData.TEACHER_NAMES.length)];
    subjectNames.forEach(subject_name => {
        subjectRegisters.push({
            subject_name,
            semester,
            speciality,
            year,
            students_list,
            subject_type:subjectTypes[coff],
            description:'',
            coefficient:coff,
            teacher,
            faculty,
            educational_level:'bachelor', // bachelor| magistr
            educational_form:'full', // external | full
            budget_amount
        })
    });
    return subjectRegisters;
}
function genStream(faculty,s,namesProvider){
    let streamLength = getRandomInt(1,3)
    let stream = [];
    for (let i = 0; i < streamLength; i++) {
        let amountStudents = getRandomInt(17, 25)
        let amount_budget = getRandomInt(0,15)
        let students = getStudentList(namesProvider,amountStudents ,amount_budget)
        s.count++;
        stream.push({
            group_name:[s.gr, s.count.toString()].join('-'),
            students,
            amount_budget,
            faculty,
            speciality:{
                name:s.name,
                code:s.code
            }
        })
        
    }
    return stream;
}
function getStudentList(studentNames, amount, budget) {
    let students = [];
    for (let i = 0; i <  amount;i++) {
        students.push(getStudent(studentNames.getNext(), i < budget ? true : false))
    }
    return students;
}
function getStudent(line, budget) {
    const l = line.toString().split(' ')
    return {
        surname: l[0],
        name: l[1],
        middle_name: l[2],
        budget,
        student_card: ['ТМ №', getRandomInt(11111111, 99999999)].join('')
    }
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}
function genRandomDisceplines(){
    let disceplines = [];
    let disceplinesCount = getRandomInt(5,8)
    for (let i = 0; i < disceplinesCount; i++) {
        const d = inputData.SUBJECT_NAMES[getRandomInt(0,inputData.SUBJECT_NAMES.length)]
        disceplines.push(d)
    }
    // for unique
    disceplines = [...new Set(disceplines)];
    return disceplines;
}
function getRandomPoint(){
    let point = getRandomInt(50,101);
    let letter;
    if(point<60){
        letter = 'E'
    }
    else if(point<74){
        letter = 'D'
    }
    else if(point<82){
        letter = 'C'
    }
    else if(point<90){
        letter = 'B'
    }
    else if(point<=100){
        letter = 'A'
    }
    return [point,letter];
}
function genStudentsRegisters(stream){
    let students = []
    
    stream.forEach(g=>{
        g.students.forEach(s=>{
            let [point, letter] = getRandomPoint()
            students.push({
                student:s,
                point,
                letter,
                group:g.group_name
            })
        })
        
    })
    return students;
}
function sumBudget(stream){
    let sum = 0;
    for (let i = 0; i < stream.length; i++) {
        sum += stream[i].amount_budget;
        
    }
    return sum;
}
