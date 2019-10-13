const {generateAuth} = require("./generateAuth.js")

let moment = require('moment');
const rp = require("request-promise");
const CALLBACK_URL = require("./../../configuration/mpesa.config").CALLBACK_URL;
const STK_PUSH_URL = require("./../../configuration/mpesa.config").STK_PUSH_URL;
const ONLINE_SHORT_CODE = require("./../../configuration/mpesa.config").ONLINE_SHORT_CODE;
const ONLINE_PASS_KEY = require("./../../configuration/mpesa.config").ONLINE_PASS_KEY;
const ACCOUNT_REF = require("./../../configuration/mpesa.config").ACCOUNT_REF;

const stkPush =  async (amount,mobileNumber) => {    
    let TimeStamp = moment(new Date(Date.now())).format("YYYYMMDDHHmmss")
    let auth = await generateAuth()

    console.log("AUTH:",auth)
    
    return rp(
        {
            method:"POST",
            url:STK_PUSH_URL,
            headers:{
                "Authorization": "Bearer " + auth
            },
            json:{
                "BusinessShortCode": ONLINE_SHORT_CODE,
                "Timestamp": TimeStamp,
                "Password": Buffer.from(ONLINE_SHORT_CODE + ONLINE_PASS_KEY + TimeStamp).toString("base64"),
                "TransactionType": "CustomerPayBillOnline",
                "Amount": amount,
                "PartyA": mobileNumber,
                "PartyB": ONLINE_SHORT_CODE,
                "PhoneNumber":mobileNumber,
                "CallBackURL": CALLBACK_URL,
                "AccountReference": ACCOUNT_REF,
                "TransactionDesc": "Subscription" 
            }
        }
    )
    .then(data => data)
    .catch(error => {
        console.log("ERROR:",error)
    })
}

// stkPush()

module.exports = {
    stkPush
}