const data  = require('./data')
const url   = String(data.Url).concat(data.OrgId, '/operaciones') 
const axios = require('axios').default;
const params = {T: data.Token};

axios.get(url, {params})
    .then(function (response) {
        const operaciones  = response.data.data
        console.log('OperacionesEncontradas:', operaciones.length)
        console.log('Id Primera encontrada: ', operaciones[0].opOperacionId)
        return axios.get(url.concat('/', operaciones[0].opOperacionId),  {params})
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