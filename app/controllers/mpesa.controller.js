// let helper = require('./../Helpers')
// let mpesa = require('../mpesa')
// var moment = require('moment');
// let mpesa = require('../helpers/mpesa/ApiHelpers')
const stkPush = require("../helpers/mpesa/stkPush").stkPush

const db = require("../models");

const receiveMpesa = {}

receiveMpesa.post = (req,res) => { 
    console.log("RECEIVE MPESA:",req.body)
    // RECEIVE SUCCESSFULL MPESA DATA AND UPDATE SUBSCRIPTION
}

module.exports = {
    receiveMpesa
}