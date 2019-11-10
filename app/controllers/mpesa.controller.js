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
    console.log("RESULT CODE:",req.body.Body.stkCallback.ResultCode)
    console.log('-----------------------');

    let message = {
        "ResponseCode": "00000000",
        "ResponseDesc": "success"
    };

    switch(req.body.Body.stkCallback.ResultCode){
        case 0:
            console.log("Transaction Successfull");
            db.SubscriptionSchema.findOne({
                mpesaRequest:req.body.Body.stkCallback.MerchantRequestID
            },(err,result)=>{
                if(err){
                    throw new Error(err)
                }else if(result){
                    db.SubscriptionSchema.findOneAndUpdate({
                        mpesaRequest:req.body.Body.stkCallback.MerchantRequestID
                    },{
                        mpesaTransactionRef:req.body,
                        status:"Active"
                    },(err,doc,res)=>{
                        console.log("SUBSCRIPTION DB RESPONSE:",res)
                        console.log("send subscription message")
                        let sms = `You have subscribed to ${res.duration} minutes of unlimited data @ ${res.amount}/-`
                        sendMessage(res.phoneNumber,sms)
                    }).then(()=>{
                        res.status(200).json({
                            success:true,
                            message
                        })                  
                        // Emit mpesa succesfull notification:
                    }).catch(error => {
                        console.log("MPESA CALLBACK ERROR:",error)
                    })
                } 
            })
        
            db.GiftSchema.findOne({
                mpesaRequest:req.body.Body.stkCallback.MerchantRequestID
            },(err,result)=>{
                if(err) throw new Error(err)
                if(result){
                    db.GiftSchema.findOneAndUpdate({
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

            break;

        case 1:
            console.log("Insufficient Funds");
            break;

        case 2001:
            console.log("Wrong PIN");
            break;

        case 1032:
            console.log("Cancelled Transaction");
            break;

        case 1037:
            console.log("Time Out");
            break;

        default:
            console.log("Something is up")
    }


}

module.exports = {
    mpesaHook
}