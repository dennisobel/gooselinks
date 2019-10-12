const prettyjson = require('prettyjson');
const stkPush = require("../helpers/mpesa/stkPush").stkPush
const sendMessage = require('./../helpers/sms/sms').sendSMS

const db = require("../models");

const gift = {}

gift.post = (req,res) => {
    console.log("INCOMING GIFT DATA:",req.body)
    
    let data = {
        phoneNumber:req.body.phoneNumber,
        amount:req.body.amount,
        expires:req.body.expires
    } 
    
    stkPush(data.amount,data.phoneNumber)
    .then( response => {
        console.log("STK PUSH FEEDBACK:",response)

        // MOVE THIS CODE TO MPESA CONTROLLER LATER
        let newGift = db.GiftSchema({
            recepient:req.body.friendNumber,
            sender:req.body.phoneNumber,
            packages:req.body.packages,
            duration:req.body.duration,
            amount:req.body.amount,
            expires:req.body.expires,
            mpesaRequest:response.MerchantRequestID
        },()=>console.log("newGift: ",newGift))
        .save()
        .then(()=>{
            // SEND SUBSCRIPRION SMS
            // console.log("send message")
            let sms = `You have received ${newGift.duration} of data from ${newGift.sender}`
            sendMessage(newGift.recepient,sms).then(()=>{
                sendMessage(newGift.sender,`Your gift to ${newGift.recepient} has been delivered.`)
            })
        })
        .then(()=>{
            res.status(200).json({
                success:true,
                doc:newGift
            })
        })
    })    
}

gift.get = (req,res) => {
    console.log("ïnside get gifts",req.params)
    db.GiftSchema.find({
        recepient:req.params.phoneNumber
    },(err,doc) => {
        // console.log("DOC:",doc)
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
    gift
}