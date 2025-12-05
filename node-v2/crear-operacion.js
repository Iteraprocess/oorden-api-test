
//se importan los datos y credenciales para las llamads
const data = require('./../organizations/data.json')
// se utuliza axios para manejar las peitciioones 
const axios = require('axios');



async function PreCrearOperacion() {
    const aplicar = '';
    //const Url = `http://localhost:8145/crear/VTA`;
    const Url = `${data.Url}/operaciones/crear/VTA`;

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
        console.log(error)
        console.log('Error: ', error.message);

        if(error.response) {
            if(error.response.data) console.log('ErrorData:', error.response.data);
            else console.log('No error data');
        }  
    }
}




async function CrearOperacion() {
    const aplicar = '';
    //const Url = `http://localhost:8145/crear`;
    const Url = `${data.Url}/operaciones/crear`;

    //Se arman las headers tal cual se necesitan
    const headers = {
        OordenOrg      : data.OrganizacionId,
        OordenUsr      : data.UsuarioId,
        //OrganizacionId:data.OrganizacionId,
        //UsuarioId: data.UsuarioId,
        Authorization  : 'Bearer '.concat(data.Token)
    }

    let response;
   
    const dataOperacion = {
        tipoOperacion    : "VTA", //VTA para ventas, "COM", "VNC", "CNC"
        seccion          : "V", // V para ventas 

        operacion : {
            terceroId        : "85bb8cc9-c1a2-435d-aceb-3b025d46dbb8",
            fecha            : "2025-03-13",
            fechaVencimiento : null, // null o definir una fecha de vencimiento
            numero           : null, 
            serie            : null,
            referencia       : '[Venta de prueba]',
            moneda           : "MXN",// "EUR" en su caso// , o USD
            tasaDeCambio     : "1",
        },
    
        items : [
            {
                productoId : "509ff8e1-5d08-4753-aa98-875cde9c7478",
                concepto : "Bicicleta.",
                cantidad : "1",
                precioUnitario :"2500",
                descuento : "0", //en porcentaje
                trasladoId : "T|IVA|T|16.00",
                retencionId : '',
                cuentaId : '401-01-20-000',// '401-01-20-00',
                elem1Id  : null,
                elem2Id : null,
                unidad: null //?
            }
        ]
    }
    
    try {
        response = await axios.post(Url, dataOperacion, {params : {aplicar}, headers});
        console.log('Response:');
        console.log(response.data);
    } catch (error) {
        //console.log(error)
        console.log('Error: ', error.message);
    
        if(error.response) {
            if(error.response.data) console.log('ErrorData:', error.response.data);
            else console.log('No error data');
        }  
    }
}

CrearOperacion();