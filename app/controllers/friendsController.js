const db = require("./../models");

const getFriend = {}

getFriend.get = (req,res) => {
    console.log("INCOMING FRIEND REQ:",req.params)    

    db.UserSchema.find({
        phoneNumber:req.params.phoneNumber
    },(err,doc) => {
        console.log("DOC:",doc)
        if(doc){
            res.status(200).json({
                success: true,
                user:doc
            })
        }else{
            res.status(404).send('Sorry, User not found!')
        }
    })    
}

module.exports = {
    getFriend
}