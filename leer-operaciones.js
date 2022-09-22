const data  = require('./data')
const url   = String(data.Url).concat(data.OrgId, '/operaciones') 
const axios = require('axios').default;

axios.get(url, {
        params : {T: data.Token}
    })
    .then(function (response) {
        console.log(response.data)
    })
    .catch(function (err) {
        console.log('---- ERROR ----');
        console.log(err.message)
        console.log(err.response.data.url)
        console.log(err.response.data.error);
    });