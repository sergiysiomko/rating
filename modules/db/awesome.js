db.getCollection('subjects').aggregate([
   
    { "$group": {
        _id: {
            semester: "$semester",
            year: "$year",
            speciality:"$speciality",
            groups:'$students_list.group'
        }
    }}
])



// відомості
db.getCollection('subjects').aggregate([
   
    { "$group": {
        _id: {
            semester: "$semester",
            year: "$year",
            speciality:"$speciality"
        },
        subj:{$push:'$subject_name'}
    }}
])

//відоиості
db.getCollection('subjects').aggregate([
    {$match:{
        year: 2014,
             semester: 1,
        }
        },
     { "$group": {
         _id: {
             speciality: "$speciality"
             
             
         },
         asdf:{$push:{st:'$students_list', sn:'$subject_name'}}
     }}
 ])


// всі семестри інфа
 db.getCollection('subjects').aggregate([
   
    { "$group": {
        _id: {
            semester: "$semester",
            year: "$year",
            speciality:"$speciality"
        },
        subj:{$push:{sb:'$subject_name', st:'$students_list'}}
    }}
],{ allowDiskUse: true })