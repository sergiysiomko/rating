function calcRatingList(registers, precent = 42) {
    // calculate rating list
    
    let rating = []
    const budgetAmount = registers[0].budget_amount;
    
    const stipendAmount = Math.ceil(budgetAmount * (precent/100));
    
    let {students_list:studentsList} = registers[0];

    for (let i = 0; i < studentsList.length; i++) {   
        rating.push(getRatingListItem(i, registers));
    };
    
    // decrement sort
    rating.sort((a, b) => b.avg - a.avg)//ShellSort(rating, (a, b)=> a.avg < b.avg)

    let freePlace = stipendAmount;
    // stipend computing
    for (let i = 0; i < rating.length && freePlace > 0; i++) {
        const r = rating[i];
        let unclose =  r.points.some( p => p < 60)
        r.isStipend = false;
        if(r.isBudget && unclose===false){
            r.isStipend = true;
            freePlace--;
        }
    }    
    const subjects = registers.map(r=> r.subject_name)
    let groups = new Set(studentsList.map(s => s.group))
    let avg = rating.reduce((acc, curr) => acc + curr.avg, 0) / rating.length; 
    avg = Math.round(avg * 10) / 10;  

    // round avg
    for (let i = 0; i < rating.length; i++) {
        rating[i].avg = Math.round(rating[i].avg * 10) / 10;  
    }
    // sort by budget
   rating.sort((a, b) => b.isBudget - a.isBudget)
    // sort by stipend
   rating.sort((a, b) => b.isStipend - a.isStipend)
    return {
        list:rating, 
        subjects, 
        budgetAmount, 
        stipendAmount, 
        freePlace,
        speciality:registers[0].speciality,
        year:registers[0].year,
        semester:registers[0].semester,
        groups:[...groups],
        avg
        //teacher:registers[0].teacher
    };
    
}

function getRatingListItem(index, registers){
    let {students_list:studentsList} = registers[0];
    let s = studentsList[index];
    let item = {};
    const coffs = registers.map(r => r.coefficient)
    item.name = [s.student.name, s.student.middle_name, s.student.surname].join(' ')
    item.student_card = s.student.student_card;
    item.isBudget = s.student.budget;
    item.group = s.group;

    let points = registers.map(reg => reg.students_list[index].point)
    
    // calculate rating point
    let  num = 0, den = 0;
    for (let j = 0; j < points.length; j++) {
        num += points[j] * coffs[j];
        den += coffs[j] 
    }
    
    item.points = points;
    item.avg = num/den;

    return item;
}

function groupBySemester(registers){
    // create arrat for every semester
    let semesters = [[]];
    let semester = registers[0].semester;
    for (let i = 0, j = 0; i < registers.length; i++) {
        
        if(registers[i].semester == semester){
            semesters[j].push(registers[i])
        }
        else{
            semester = registers[i].semester;
            semesters.push([]);
            j++;
            semesters[j].push(registers[i])  
              
        }
        
    }
    return semesters;
}
module.exports.calcRatingList = calcRatingList;
module.exports.groupBySemester = groupBySemester;

