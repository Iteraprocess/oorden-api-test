
//se importan los datos y credenciales para las llamads
const data = require('./../organizations/data-webxciter.json')
// se utuliza axios para manejar las peitciioones 
const axios = require('axios');



async function leerOperacion(operacionId) {
    const Url = `${data.Url}/operaciones/operacion/${operacionId}`;

    console.log(Url)

    //Se arman las headers tal cual se necesitan
    const headers = {
        OordenOrg      : data.OrganizacionId,
        OordenUsr      : data.UsuarioId,
        OrganizacionId:data.OrganizacionId,
        UsuarioId: data.UsuarioId,
        Authorization  : 'Bearer '.concat(data.Token)
    }

    let response;
    
    try {
        response = await axios.get(Url, { headers});
        console.log('Response:');
        console.log(JSON.stringify( response.data, null, 2));
    } catch (error) {
       // console.log(error)
        console.log('Error: ', error.message);

        if(error.response) {
            if(error.response.data) console.log('ErrorData:', error.response.data);
            else console.log('No error data');
        }  
    }
}


leerOperacion(process.argv[2])