const mongoose = require('mongoose');

const getConnection = ()=>{
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

module.exports.getConnection = getConnection
