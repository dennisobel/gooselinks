const ADVANTA_API_KEY = require("./../../configuration/advanta").APIKEY
const PARTNER_ID = require("./../../configuration/advanta").PARTNERID
const SHORT_CODE = require("./../../configuration/advanta").SHORTCODE

const superagent = require("superagent");

// const MOBILE = "254727677068";
// const MESSAGE = "Test SMS from nodejs";

const sendSMS = async (mobile,message) => {
    console.log("INCOMING SMS PARAMS:",{mobile,message})
    const results = await superagent
    .post("https://quicksms.advantasms.com/api/services/sendsms/")
    .send({
        apikey:ADVANTA_API_KEY,
        partnerID:PARTNER_ID,
        message,
        shortcode:SHORT_CODE,
        mobile
    })
    .set(
        'accept', 'application/json'
    )
    .set(
        'content-type', 'application/json'
    )

    console.log("RESULTS:",results)
}

// sendSMS()

module.exports = {
    sendSMS
}