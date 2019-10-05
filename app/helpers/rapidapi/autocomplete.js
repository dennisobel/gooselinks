const rp = require("request-promise");
const APIKEY = require("./../../configuration/rapidapi").APIKEY
 
const search = async (queryString) => {
  // let options = 

  return rp(
    {
      method: 'GET',
      url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/spelling/AutoComplete',
      qs: {text: queryString},
      headers: {
        'x-rapidapi-host': 'contextualwebsearch-websearch-v1.p.rapidapi.com',
        'x-rapidapi-key': APIKEY
      },
      body: { value: 8.5 },
      json: true     
    }
  ).then(data => {
    console.log(data)
    // return JSON.parse(data)
    return data
  }) 
}

module.exports = {
  search
}