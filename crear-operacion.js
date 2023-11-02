const data  = require('./data')
const url   = String(data.Url).concat(data.OrgId, '/operaciones') 
const axios = require('axios').default;
const headers = {Authorization: 'Bearer '.concat(data.Token)};

axios.post(url,  {
    //organizacion_id: '4a9d55d2-3e8d-4a96-bc34-d158c40d7382',
    operacion: {
        "seccion": "V",
        "tipo_operacion": "VTA",
        "tercero_id" : "168d5898-2a59-47d1-8ee0-f1837d3637b3",
        "tipo_documento" : "cdfd36ac-c24f-4caa-b7a7-fb6e9553aae7",
        "moneda" : 'MXN',
        "tasa_de_cambio" : "1",
        "serie": "",
        "numero": null,
        "referencia": "-- API --",
        "fecha": "2023-06-02",
        "subtotal": "204.312000",
        "impuestos": "32.689920",
        "retenciones": "0.000000",
        "total": "237.001920",
    },
    "items": [
        {
                posicion_item: 0,
                "producto_id": "01958f74-964e-4250-87a6-6b1f83ab11ff",
                "producto_nombre" : 'Producto #1',
                "cantidad": "4.000000",
                "unidad": "MTR",
                "precio_unitario": "100",
                "descuento": "0.00000000",
                "cuenta_id": "15280abd-6e06-4efa-a43d-6f21e7b45c07",
                "impuesto_conjunto_id": "T|IVA|T|16.00",
                "retencion_conjunto_id": null,
                "importe": "204.312000"
        }
    ], 
    cantidadItems:1
}, {headers}).then(result => {
    console.log(result.data)
})