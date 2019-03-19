const axios = require('axios');

module.exports = (numOfCalls, urlEndpoint) => {
  return [...new Array(numOfCalls)].map(() => {
    return axios.get(urlEndpoint)
  })
}