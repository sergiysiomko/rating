const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');

const RolesEnum = {teacher:"teacher", admin:"admin"}

const UsersSchema = new Schema({
    name:String,
    role:{
        type:String,
        required:true,
        default:RolesEnum.teacher
    },
    password:{
        type:String,
        required:true
    },
    login:{
        type:String,
        required:true,
        unique:true
    }
})
UsersSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UsersSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Users', UsersSchema)