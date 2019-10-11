const stkPush = require("../helpers/mpesa/stkPush").stkPush
const sendMessage = require('./../helpers/sms/sms').sendSMS

const db = require("../models");

const subscribe = {}


subscribe.post = (req,res) => {
    console.log("INCOMING SUBSCRIBE DATA:",req.body)
    
    let data = {
        // userName:req.body.user.userName,
        phoneNumber:req.body.phoneNumber,
        amount:req.body.amount,
        // id:req.body.user.id,
        // link:req.body.link.url
    }     
    
    
    stkPush(data.amount,data.phoneNumber)
    .then( data => {
        console.log("STK PUSH FEEDBACK:",data)

        // MOVE THIS CODE TO MPESA CONTROLLER LATER
        let newSubscription = db.SubscriptionSchema({
            phoneNumber:req.body.phoneNumber,
            packages:req.body.packages,
            duration:req.body.duration,
            amount:req.body.amount
        },()=>console.log("newSubscription: ",newSubscription))
        .save()
        .then(()=>{
            // SEND SUBSCRIPRION SMS
            console.log("send message")
            let sms = `You have subscribed to ${req.body.duration} minutes of unlimited data @ ${req.body.amount}/-`
            sendMessage(req.body.phoneNumber,sms)
        })
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
        phoneNumber:req.params.phoneNumber
    },(err,doc) => {
        console.log("DOC:",doc)
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
    subscribe
}