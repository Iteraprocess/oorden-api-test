const data  = require('./data')
const url   = String(data.Url).concat(data.OrgId, '/operaciones') 
const urlArchivos  = String(data.Url).concat(data.OrgId, '/archivos') 
const axios = require('axios').default;
const headers = {Authorization: 'Bearer '.concat(data.Token)};

axios.get(url, {headers, params:{fechaInicial: '2022-09-01', fechaFinal: '2022-09-30'}})
    .then(function (response) {
        const operaciones  = response.data.data
        console.log('OperacionesEncontradas:', operaciones.length)
        console.log('Id Primera encontrada: ', operaciones[0].opOperacionId)
        console.log('El servicio me confirma las fechas sobre las que hice el request:', response.data.query);
    
        operaciones.map(o => {
            console.log(o.opFecha, o.opOperacionId, o.opTitulo)
        });

        let operacionId = "6f8beef9-6ab9-ee0e-0538-2a80f48d8890";
        //let operacionId = operaciones[0].opOperacionId
        console.log(operacionId);
        return axios.get(url.concat('/', operacionId), {
            headers
        });
        
    })
    .then(function (response) {
        console.log(response.data.data);
        return response;
    })
    .then(function (response) {

        if(response.data.data && response.data.data.archivos && response.data.data.archivos[0]) {
            let archivoId = response.data.data.archivos[0].archivo_id

            axios.get(urlArchivos.concat('/', archivoId, '/descargar'),{headers}).then(response => {
                console.log('respuestaArchivo:', response.data);
            }).catch(err => {
                console.log('---- ERROR DESCARGANDO ARCHIVO----');
       
                console.log(err.message)
                console.log(err.response.data.url)
                console.log(err.response.data.error);
            })
        }
    })
    .catch(function (err) {
        console.log('---- ERROR ----');
       
        console.log(err.message)
        console.log(err.response.data.url)
        console.log(err.response.data.error);
    
    });