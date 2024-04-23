
//se importan los datos y credenciales para las llamads
const data = require('./../organizations/datav2.json')
// se utuliza axios para manejar las peitciioones 
const axios = require('axios');


async function GetOrganizacionInfo() {
    const Url = `${data.Url}/organizaciones/org/info`;

    //Se arman las headers tal cual se necesitan
    const headers = {
        OordenOrg : data.OrganizacionId,
        OordenUsr : data.UsuarioId,
        Authorization: 'Bearer '.concat(data.Token)
    }

    let response;
    
    try {
        response = await axios.get(Url, {headers});
        console.log('Response:');
        console.log(response.data);
    } catch (error) {
        console.log('Error: ', error.message);
        if(error.response) {
            if(error.response.data) console.log('ErrorData:', error.response.data);
            else console.log('No error data');
        }  
    }
}

GetOrganizacionInfo();