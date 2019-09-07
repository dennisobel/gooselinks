const mongoose = require('mongoose');
const { Schema } = mongoose;
// var bcrypt   = require('bcrypt-nodejs');

mongoose.Promise = global.Promise;

const subscriptionSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId, ref: "UserSchema"
    },
    book:[{type: Schema.Types.ObjectId, ref: "BookSchema"}],    
    time:{
        type: Date,
        default: Date.now()
    },
    status:{
        // Subscription active or expired
        type: String
    },
    mpesaTransactionRef:{
        type: String
    } 
})

module.exports = mongoose.model("SubscriptionSchema", subscriptionSchema);