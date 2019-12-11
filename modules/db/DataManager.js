const mongoose = require('mongoose');
const SubjectSchema = require('./SubjectsSchema');

(() => {
  getConnection();
})()
function getConnection(){
//     0: disconnected
//     1: connected
//     2: connecting
//     3: disconnecting
    if(mongoose.connection.readyState == 0){//disconected
        mongoose.connect(process.env.DB_CONN_STRING, 
            {
              useNewUrlParser: true,
              useUnifiedTopology: true,
            },
            (err)=>{
              if( err )console.log(err);
              console.log('db connect');
            })
    }

    return mongoose.connection
 
}

const saveSubject = async (obj)=>{
  try {
    let subj = new SubjectSchema(obj);
    
    return [null,await subj.save()]
  } catch (error) {
    console.log(error);
    return [error, null];
  }
}

module.exports.getConnection = getConnection
module.exports.saveSubject = saveSubject
