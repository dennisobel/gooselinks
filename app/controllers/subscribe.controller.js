const prettyjson = require('prettyjson');
const stkPush = require("../helpers/mpesa/stkPush").stkPush
const sendMessage = require('./../helpers/sms/sms').sendSMS

const db = require("../models");

const subscribe = {}
subscribe.post = (req,res) => {
    console.log("INCOMING SUBSCRIBE DATA:",req.body)    
    let data = {
        phoneNumber:req.body.phoneNumber,
        amount:req.body.amount,
        expires:req.body.expires
    }      
    
    stkPush(data.amount,data.phoneNumber)
    .then( response => {
        console.log("STK PUSH FEEDBACK:",response)
        // MOVE THIS CODE TO MPESA CONTROLLER LATER
        let newSubscription = db.SubscriptionSchema({
            phoneNumber:req.body.phoneNumber,
            packages:req.body.packages,
            duration:req.body.duration,
            amount:req.body.amount,
            expires:req.body.expires,
            mpesaRequest:response.MerchantRequestID
        },()=>console.log("newSubscription: ",newSubscription))
        .save()
        .then(()=>{
            res.status(200).json({
                success:true,
                doc:newSubscription
            })
        })
    })
}

subscribe.get = (req,res) => {
    db.SubscriptionSchema.find({
        phoneNumber:req.params.phoneNumber,
        expires: {$gte: parseInt((new Date().getTime()).toString())}
    },(err,doc) => {
        console.log("GET SUBSCRIPTION DATA:",doc)
        if(doc){
            
            res.status(200).json({
                success: true,
                doc
            })
        }else{
            res.status(404).send('Sorry, User not found!')
        }
    }) 
}

module.exports = {
    subscribe,
}