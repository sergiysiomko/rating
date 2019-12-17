function calcRatingList(registers) {
    // calculate rating list
    
    // {name, isBudget, isStipend, subj1, sub}
    let ratingg = {
        name:[],
        student_card:[],
        isBudget:[],
        isStipend:[],//
        avg:[],
        points:[],
        group:[],
        subjects:registers.map(r=> r.subject_name)
    }
    let rating = []
    const subjects = registers.map(r=> r.subject_name)
    let coffs = registers.map(r => r.coefficient)
    let {students_list:studentsList} = registers[0];

    for (let i = 0; i < studentsList.length; i++) {
        const s = studentsList[i];
        let r = {};

        r.name = [s.student.name, s.student.middle_name, s.student.surname].join(' ')
        r.student_card = s.student.student_card;
        r.isBudget = s.student.budget;
        r.group = s.group;
        r.subjects = subjects;

        let points = registers.map(reg => reg.students_list[i].point)
        
        // calculate rating point
        let avg = 0, num = 0, den = 0;
        for (let j = 0; j < points.length; j++) {
            num += points[j] * coffs[j];
            den += coffs[j] 
        }
        //avg = num/coff;
        
        r.points = points;
        r.avg = num/den;

        rating.push(r);
    };
    
    rating.forEach(r => {
        console.log(r.avg);
    });console.log('-----------------');
    rating = rating.sort((a,b) => a.avg - b.avg)
    rating.forEach(r => {
        console.log(r.avg);
    });
    console.log(rating);
    
}

function ShellSort (arr) {
    const l = arr.length;
    let gap = Math.floor(l / 2);
    while (gap >= 1) {
        for (let i = gap; i < l; i++) {
            const current = arr[i];
            let j = i;
            //console.log(arr[j - gap] === undefined);
            if(arr[j - gap].avg === undefined){
                console.log('afasfsfasdfasfasdfsfdsafd');
            }
            while (j > 0 && (arr[j - gap].avg > current.avg)) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            arr[j] = current;
        }
        gap = Math.floor(gap / 2);
    }
    return arr;
};

module.exports.calcRatingList = calcRatingList


/*
rating.name.push([s.student.name, s.student.middle_name, s.student.surname].join(' '));     
        rating.student_card.push(s.student.student_card);
        rating.isBudget.push(s.student.budget)
        rating.group.push(s.group)

        let points = registers.map(r => r.students_list[i].point)
        
        let avg = 0, num = 0, den = 0;
        for (let j = 0; j < points.length; j++) {
            num += points[j] * coffs[j];
            den += coffs[j] 
        }
        //avg = num/coff;
        
        rating.points.push(points)
        rating.avg.push(num/den)
*/