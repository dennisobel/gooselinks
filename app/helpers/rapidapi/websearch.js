const rp = require("request-promise");
const APIKEY = require("./../../configuration/rapidapi").APIKEY

const search = async (queryString) => {
  let options = {
    method: 'GET',
    url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/WebSearchAPI',
    qs: {
      autoCorrect: 'true',
      pageNumber: '1',
      pageSize: '10',
      q: queryString,
      safeSearch: 'false'
    },
    headers: {
      'x-rapidapi-host': 'contextualwebsearch-websearch-v1.p.rapidapi.com',
      'x-rapidapi-key': APIKEY
    }
  };
  
  return rp(options)
  .then(data => {
    console.log(data)
    return JSON.parse(data)
  })
}

module.exports = {
  search
}