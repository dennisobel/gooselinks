const ctrl = require("./../controllers/index");

let {iBookSignup} = require('../controllers/authController');
let {iBookLogin} = require('../controllers/authController');
let {iBookOTP} = require('../controllers/authController');
let {search} = require('../controllers/searchController');

let {getFriend} = require('../controllers/friendsController');
let {sendMpesa} = require('../controllers/mpesaController');
let {subscribe} = require('../controllers/subscriptionController');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

let appRouter = (app)=>{
    // app.post('/balanceenquiry',balanceEnquiry.post)
    app.post('/signup',iBookSignup.post)
    app.post('/login',iBookLogin.post)
    app.post('/otp',iBookOTP.post)
    app.post('/sendmpesa', sendMpesa.post)
    app.post('/subscribe', subscribe.post)
    app.post('/search',search.post)

    app.get('/getfriend/:phoneNumber',getFriend.get)
}

module.exports = appRouter