const stkPush = require("../helpers/mpesa/stkPush").stkPush
const sendMessage = require('./../helpers/sms/sms').sendSMS

const db = require("../models");

const subscribe = {}


subscribe.post = (req,res) => {
    
    
    let data = {
        // userName:req.body.user.userName,
        phoneNumber:req.body.phoneNumber,
        amount:req.body.amount,
        // id:req.body.user.id,
        // link:req.body.link.url
    }     
    
    console.log("INCOMING SUBSCRIBE DATA:",data)
    
    stkPush(data.amount,data.phoneNumber)
    .then( data => {
        console.log("STK PUSH FEEDBACK:",data)

        // MOVE THIS CODE TO MPESA CONTROLLER LATER
        let newSubscription = db.SubscriptionSchema({
            phoneNumber:req.body.phoneNumber,
            packages:req.body.packages
        },()=>console.log("newSubscription: ",newSubscription))
        .save()
        .then(()=>{
            // SEND SUBSCRIPRION SMS
            console.log("send message")
            let sms = `You have subscribed to ${req.body.duration} minutes of unlimited data @ ${req.body.amount}/-`
            sendMessage(req.body.phoneNumber,sms)
        })
    })
}

module.exports = {
    subscribe
}