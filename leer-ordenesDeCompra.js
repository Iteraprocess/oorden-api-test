var data = require('./data')
var url = String(data.Url).concat(data.OrgId, '/ordenesDeCompra')
const axios = require('axios').default;

var params = {T: data.Token}
params['ordenDeCompra-tercero_id'] = '12cf0db1-7992-4d38-a043-bdd4e8359acb';


axios.get(url, {
        params 
    })
    .then(function (response) {
        console.log(response.data)
    })
    .catch(function (err) {
        console.log('---- ERROR ----');
        console.log(err.response.data.url)
        console.log(err.response.data.error);
    })


