const prettyjson = require('prettyjson');
const sendMessage = require('./../helpers/sms/sms').sendSMS

const db = require("../models");

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
    
    db.SubscriptionSchema.findOne({
        mpesaRequest:req.body.Body.stkCallback.MerchantRequestID
    },(err,result)=>{
        if(err) throw new Error(err)
        if(result){
            db.SubscriptionSchema.findOneAndUpdate({
                // phoneNumber:req.body.Body.stkCallback.CallbackMetadata.Item[4].Value
                mpesaRequest:req.body.Body.stkCallback.MerchantRequestID
            },{
                mpesaTransactionRef:req.body,
                status:"Active"
            },(err,response)=>{
                console.log("SUBSCRIPTION DB RESPONSE:",response)
                console.log("send subscription message")
                let sms = `You have subscribed to ${response.duration} minutes of unlimited data @ ${response.amount}/-`
                sendMessage(response.phoneNumber,sms)
            }).then(()=>{
                res.status(200).json({
                    success:true,
                    message
                })        
            })
        }
    }).then((res)=>{

    })    

    db.GiftSchema.findOne({
        mpesaRequest:req.body.Body.stkCallback.MerchantRequestID
    },(err,result)=>{
        if(err) throw new Error(err)
        if(result){
            db.GiftSchema.findOneAndUpdate({
                // phoneNumber:req.body.Body.stkCallback.CallbackMetadata.Item[4].Value
                mpesaRequest:req.body.Body.stkCallback.MerchantRequestID
            },{
                status:"Active"
            },(err,response)=>{
                console.log("GIFT DB RESPONSE:",response)
                console.log("send gift message")
                // SEND GIFT SMS
                let sms = `You have received ${response.duration} of data from ${response.sender}`
                sendMessage(response.recepient,sms)
                
                sendMessage(response.sender,`Your gift to ${response.recepient} has been delivered.`)
            }).then(()=>{
                res.status(200).json({
                    success:true,
                    message
                })        
            })                
        }
    })    
}

module.exports = {
    mpesaHook
}