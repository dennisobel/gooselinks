let request = require('request');
var rp = require('request-promise');
let moment = require('moment');
let base64 = require('base-64'); 

let consumer_key = "RwV9nAayEJB4KOqz6Jhwpb3KchTp1QYm"; 
let consumer_secret = "idQR39pxoUVfd2B2";
let SecurityCredential = "fP6K2KuL"

let genoauthUrl = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
let c2bsimulateUrl = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate";
let registerUrl = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl";
let accountbalUrl = "https://sandbox.safaricom.co.ke/mpesa/accountbalance/v1/query";
let transactionStatusUrl = "https://sandbox.safaricom.co.ke/mpesa/transactionstatus/v1/query";
let reversalUrl = "https://sandbox.safaricom.co.ke/mpesa/reversal/v1/request";
let lipaNaMpesaUrl = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
let lipaNaMpesaQueryUrl = "https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query";
let QueueTimeOutURL = "https://197.248.117.74:3000/timeout";
let ResultURL = "https://197.248.117.74:3000/result";
let ConfirmationURL = "https://197.248.117.74:3000/confirmation";
let ValidationURL = "https://197.248.117.74:3000/validation";
let CallBackURL = "https://197.248.117.74:4000/callback";


let ResponseType = "Completed";
let ShortCode = "600733";
let Initiator = "Safaricomapi";


// var spawn = require('child_process').spawn;
const db = require("./../models");
let mpesa = require('../helpers/mpesa/ApiHelpers')

const subscribe = {}
/*
// NIFTY
makePayment = function(_data){
    console.log("incoming: ",_data)
    var spawn = require('child_process').spawn;
    
    var scriptExecution = spawn("python", ["./nifty.py"]); 
    // var scriptExecution = spawn("python", ["../../nifty/nifty.py"]); 

   // Handle normal output
   scriptExecution.stdout.on('data', (data) => {
       console.log("python output",String.fromCharCode.apply(null, data));
   });

   var data = JSON.stringify([_data.phoneNumber,parseInt(_data.amount),'kbsacco','f861c6cc-4efa-4306-8eee-08f035b03772']);
   console.log("data: ",data)
   // Write data (remember to send only strings or numbers, otherwhise python wont understand)
   scriptExecution.stdin.write(data);
   // End data write
   scriptExecution.stdin.end();        
}
// EOF NIFTY
*/

subscribe.post = (req,res) => {


    let data = {
        userName:req.body.user.userName,
        phoneNumber:req.body.user.phoneNumber,
        id:req.body.user.id,
        link:req.body.link.url
    }

    var _data = {
        phoneNumber:parseInt(req.body.user.phoneNumber),
        amount:10
    }        
    
    return new Promise((resolve,reject) => {        
        const onlinePassKey = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
        const onlineShortCode = "174379";
        const auth = "Basic " + new Buffer.from(consumer_key + ":" + consumer_secret).toString("base64");
        const TimeStamp = moment(new Date(Date.now())).format("YYYYMMDDHHmmss")
        const tobeencoded = (onlineShortCode + onlinePassKey + TimeStamp)

        console.log("TIMESTAMP:",TimeStamp)
    
        console.log("tobeencoded:",typeof(tobeencoded))
        const encoded = new Buffer(tobeencoded)
        const password = encoded.toString('base64');
        console.log("PASSWORD:",password)    

        mpesa.genOAuth(auth,TimeStamp,password).then(body => {  
            
    
            console.log("auth:",auth)
            
            mpesa.lipaNaMpesa(auth,TimeStamp,password)            
            .then(body => {     
                console.log("Mwili :",body)
            }).catch(error => {
                console.log("Errors :",error)                
            })                
               
        })
    
    })

}

module.exports = {
    subscribe
}