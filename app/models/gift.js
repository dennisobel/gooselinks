const mongoose = require('mongoose');
const { Schema } = mongoose;
// var bcrypt   = require('bcrypt-nodejs');

mongoose.Promise = global.Promise;

const giftSchema = new Schema({
    recepient:{
        type: String
    },
    sender:{
        type: String
    },
    packages:{
        type: Array
        // Schema.Types.Mixed
    },
    duration:{
        type: String
    },
    amount:{
        type: String
    },
    time:{
        type: Date,
        default: Date.now()
    },
    status:{
        type: String,
        default: "Inactive"
    },
    expires:{
        type: String
    },
    mpesaRequest:{
        type: String
    }        
})

module.exports = mongoose.model("GiftSchema", giftSchema);