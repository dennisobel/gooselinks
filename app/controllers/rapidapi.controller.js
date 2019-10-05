const autoComplete = require("./../helpers/rapidapi/autocomplete").search
const imageSearch = require("./../helpers/rapidapi/imagesearch").search
const newsSearch = require("./../helpers/rapidapi/newssearch").search
const webSearch = require("./../helpers/rapidapi/websearch").search

const search = {}

search.post = async (req,res) => {
    const queryString = req.body.searchTerm;

    let autoComp = await autoComplete(queryString)
    let image = await imageSearch(queryString)
    let news = await newsSearch(queryString)
    let web = await webSearch(queryString)

    let results = {
        autoComp,
        image,
        news,
        web
    } 

    console.log("SEARCH RESULTS:",results)

    res.status(200).json({
        success:true,
        results
    })
}

module.exports = {
    search
}