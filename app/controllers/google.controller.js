const https = require('https')
const google = require("../configuration/google.config");
const API_KEY = google.API_KEY;
const SEARCH_ID = google.SEARCH_ENGINE_ID;
const request = require("request-promise")

const GSR = require('google-search-results-nodejs')
const client = new GSR.GoogleSearchResults("c500ebfbbac194981dd75f7265a0de442f50108ff9e07914beed4ae5f267bd87")

const search = {}

search.get = (req,res) => {
    const queryString = req.params.searchTerm; 
    console.log("QUERY STRING:",queryString)
    client.json({
        q: queryString, 
        location: ""
       }, (result) => {
         console.log("SEARCH RESULT:", result)

         res.status(200).json({
             success:true,
             result
         })
       }) 

    /*
    const queryString = req.params.searchTerm; 
    console.log("QUERY STRING:",queryString)

    return request(
        {
            method:"GET",
            url:`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ID}:omuauf_lfve&q=${queryString}&callback=hndlr`
        }
    )
    .then(data => {
        console.log("serch results:",data)
        return data
    })
    .catch(error => {rs
        console.log("ERROR:",error)
    })

    */
}

module.exports = {
    search
}