const data  = require('../../data')
const axios = require('axios').default;

//Se arman los headers que se van a enviar
// Se debe incluir el id de la organizacion, el id del Usuario y la authorizacion correspondiente
const headers = {
    OordenOrg : data.OrganizacionId,
    OordenUsr : data.UsuarioId,
    Authorization: 'Bearer '.concat(data.Token)
}


const cuenta     = '102-01-02-001';
const fechaDesde = '2023-10-25';
const fechaHasta = '2023-10-25';

//LA url a consultar (Auxiliar)
const url =`${data.Url}/reportes/contable/auxiliar/${cuenta}`;

console.log('url:', url);
console.log('Headers a enviar:', headers);

axios.get(url , {headers, params:{fechaDesde, fechaHasta} })
    .then(function (response) {
        const data  = response.data;
        
        console.log('Se recibe en data.cuenta los datos de la cuenta');
        console.log('En auxiliar se tiene un array con cada uno de los movimientos');
        console.log(data.cuenta)
    })
    .catch(function (err) {
        console.log('---- ERROR ----');
        console.log(err.message)
        console.log(err.response && err.response.data)
    });