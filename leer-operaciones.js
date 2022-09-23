const data  = require('./data')
const url   = String(data.Url).concat(data.OrgId, '/operaciones') 
const axios = require('axios').default;
const headers = {Authorization: 'Bearer '.concat(data.Token)};

axios.get(url, {headers, params:{fechaInicial: '2022-09-01', fechaFinal: '2022-09-30'}})
    .then(function (response) {
        const operaciones  = response.data.data
        console.log('OperacionesEncontradas:', operaciones.length)
        console.log('Id Primera encontrada: ', operaciones[0].opOperacionId)
        console.log('El servicio me confirma las fechas sobre las que hice el request:', response.data.query)
        
        operaciones.map(o => {
            console.log('fechaOperacion: ', o.opFecha)
        });

        return axios.get(url.concat('/', operaciones[0].opOperacionId),  {headers});

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