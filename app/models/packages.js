const mongoose = require('mongoose');
const { Schema } = mongoose;
// var bcrypt   = require('bcrypt-nodejs');

mongoose.Promise = global.Promise;

const packageSchema = new Schema({
    title:{
        type: String
    }, 
    url:{
        type: String
    },
    image:{
        type: String
    },
    category:{
        type: String
    },
    price:{
        type: Array
    } 
})

module.exports = mongoose.model("PackageSchema", packageSchema);