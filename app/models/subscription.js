const mongoose = require('mongoose');
const { Schema } = mongoose;
// var bcrypt   = require('bcrypt-nodejs');

mongoose.Promise = global.Promise;

const subscriptionSchema = new Schema({
    phoneNumber:{
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
        // Subscription active or expired
        type: String,
        default: "Inactive"
    },
    mpesaTransactionRef:{
        type: Array
    },
    expires:{
        type: String
    }
})

module.exports = mongoose.model("SubscriptionSchema", subscriptionSchema);