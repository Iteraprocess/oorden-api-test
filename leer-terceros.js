var data = require('./data.json')
var url = String(data.Url).concat(data.OrgId, '/terceros') 
const axios = require('axios').default;

console.log(url)
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
