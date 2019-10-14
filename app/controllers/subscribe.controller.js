const prettyjson = require('prettyjson');
const stkPush = require("../helpers/mpesa/stkPush").stkPush
const sendMessage = require('./../helpers/sms/sms').sendSMS

const db = require("../models");

const subscribe = {}

/*
const mpesaHook = {}

mpesaHook.post = (req,res) => {
    console.log('-----------Received M-Pesa webhook-----------');
	// console.log("mpesa payment feedback:",req.body);
    // format and dump the request payload recieved from safaricom in the terminal
    var options = {
        noColor: false
    };
    console.log(prettyjson.render(req.body, options));
    console.log('-----------------------');

    let message = {
        "ResponseCode": "00000000",
        "ResponseDesc": "success"
    };

    let g
    let s   

    if(
        (()=>{
            db.SubscriptionSchema.findOne({
                mpesaRequest:req.body.Body.stkCallback.MerchantRequestID
            },(err,res)=>{
                console.log("S",res)
                s = res
                return s
            })
        })() == null
    ){
        db.SubscriptionSchema.findOneAndUpdate({
            // phoneNumber:req.body.Body.stkCallback.CallbackMetadata.Item[4].Value
            mpesaRequest:req.body.Body.stkCallback.MerchantRequestID
        },{
            mpesaTransactionRef:req.body,
            status:"Active"
        },()=>{
            console.log("send message")
            let sms = `You have subscribed to ${req.body.duration} minutes of unlimited data @ ${req.body.amount}/-`
            sendMessage(req.body.Body.stkCallback.CallbackMetadata.Item[4].Value,sms)
        }).then(()=>{
            res.status(200).json({
                success:true,
                message
            })        
        })
    }

    if(
        (()=>{
            db.GiftSchema.findOne({
                mpesaRequest:req.body.Body.stkCallback.MerchantRequestID
            },(err,res)=>{
                console.log("G",res)
                g = res
                return g
            })
        })() == null){
        db.GiftSchema.findOneAndUpdate({
            // phoneNumber:req.body.Body.stkCallback.CallbackMetadata.Item[4].Value
            mpesaRequest:req.body.Body.stkCallback.MerchantRequestID
        },{
            status:"Active"
        },()=>{
            console.log("send gift message")
            // SEND GIFT SMS
            let sms = `You have received ${newGift.duration} of data from ${newGift.sender}`
            sendMessage(req.body.Body.stkCallback.CallbackMetadata.Item[4].Value,sms)
            
            sendMessage(req.body.Body.stkCallback.CallbackMetadata.Item[4].Value,`Your gift to ${newGift.recepient} has been delivered.`)
        }).then(()=>{
            res.status(200).json({
                success:true,
                message
            })        
        })        
    }
}
*/

subscribe.post = (req,res) => {
    console.log("INCOMING SUBSCRIBE DATA:",req.body)
    
    let data = {
        // userName:req.body.user.userName,
        phoneNumber:req.body.phoneNumber,
        amount:req.body.amount,
        expires:req.body.expires
        // id:req.body.user.id,
        // link:req.body.link.url
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
            // SEND SUBSCRIPRION SMS
            // console.log("send message")
            // let sms = `You have subscribed to ${req.body.duration} minutes of unlimited data @ ${req.body.amount}/-`
            // sendMessage(req.body.phoneNumber,sms)
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
    subscribe,
    // mpesaHook
}