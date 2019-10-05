const rp = require('request-promise');
const CONSUMER_KEY = require("./../../configuration/mpesa.config").CONSUMER_KEY
const CONSUMER_SECRET = require("./../../configuration/mpesa.config").CONSUMER_SECRET
const URL = require("./../../configuration/mpesa.config").GEN_AUTH_URL

const generateAuth = async () => {
    const auth = "Basic " +  Buffer.from(CONSUMER_KEY + ":" + CONSUMER_SECRET).toString("base64");

    let token 
        
    return rp(
        {
            url:URL,
            headers:{
                "Authorization":auth,
                "Content-Type": 'application/json;charset=utf-8'
            },
            body: { value: 8.5 },
            json: true 
        },
    ).then(body => {        
        token = body.access_token  
        return token         
    })
}

module.exports = {
    generateAuth
}