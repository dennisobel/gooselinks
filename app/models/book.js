const mongoose = require('mongoose');
const { Schema } = mongoose;
// var bcrypt   = require('bcrypt-nodejs');

mongoose.Promise = global.Promise;

const bookSchema = new Schema({
    title:{
        type: String
    },
    description: {
        type: String
    },
    author:{
        type: String
    },
    publisher:{
        type:String
    },
    isbnNumber:{
        type: String,
        unique: true
    }   
})

module.exports = mongoose.model("BookSchema", bookSchema);