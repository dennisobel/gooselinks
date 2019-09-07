const https = require('https')
const bing = require("./../configuration/bing");
const SUBSCRIPTION_KEY = bing.SUBSCRIPTION_KEY

const search = {}

search.post = (req,res) => {
    console.log("INCOMING SEARCH TERM:",req.body)
    const query = req.body.searchTerm

    if (!SUBSCRIPTION_KEY) {
        throw new Error('Missing the AZURE_SUBSCRIPTION_KEY environment variable')
    }  
    
    function bingWebSearch(query) {
        https.get({
            hostname: 'api.cognitive.microsoft.com',
            path:     '/bing/v7.0/search?q=' + encodeURIComponent(query),
            headers:  { 'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY },
        }, result => {
            let body = ''
            result.on('data', part => body += part)
            result.on('end', () => {
            for (var header in result.headers) {
                if (header.startsWith("bingapis-") || header.startsWith("x-msedge-")) {
                console.log(header + ": " + result.headers[header])
                }
            }
            // console.log('\nJSON Response:\n')
            // console.dir(JSON.parse(body), { colors: false, depth: null })
            res.status(200).json({
                result:JSON.parse(body),
                resultConfigs:{ colors: false, depth: null }
            })
            })
            result.on('error', e => {
            console.log('Error: ' + e.message)
            throw e
            })
        })
    }
    
    bingWebSearch(query)
}

module.exports = {
    search
}