// let helper = require('./../Helpers')
// let mpesa = require('../mpesa')
// var moment = require('moment');
let mpesa = require('../helpers/mpesa/ApiHelpers')

const db = require("./../models");

const sendMpesa = {}

sendMpesa.post = (req,res) => {
    console.log("INSIDE MPESA:")
    mpesa.genOAuth().then(body => {  
        console.log("inside genOauth")
        let _body = JSON.parse(body);
        let oauth_token = _body.access_token;
        let auth = "Bearer " + oauth_token;

        console.log("auth:",auth)

        mpesa.lipaNaMpesa(auth).then(body => { 
            console.log("inside lipanampesa")           
            console.log("Body :",body)
        }).catch(error => {
            console.log("Error :",error)
        })                
    }) 
}

module.exports = {
    sendMpesa
}