var data = require('./data.json')
var url = String(data.Url).concat(data.OrgId, '/terceros')
const axios = require('axios').default;


let  params = {T:data.Token};
params['tercero-codigo'] = 'tsmconnect';

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





