var data = require('./data')
var url = String(data.Url).concat(data.OrgId, '/ordenesDeCompra/', "481fdbdf-9578-4141-abb7-5a8a5c774ff9")
const axios = require('axios').default;

var params = {T: data.Token}


axios.get(url, {
        params 
    })
    .then(function (response) {
        console.log(response.data)
        console.log(response.data.data.items)
    })
    .catch(function (err) {
        console.log('---- ERROR ----');
        console.log(err.response.data.url)
        console.log(err.response.data.error);
    })


