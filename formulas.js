const axios = require('axios').default;
 

const llave = ""


const data_json = {
    "cctos": ["CLOUD"],
    "fechaDesde" : "2022-01-01",
    "fechaHasta" : "2022-01-31",
    "incluirCeros": 1,
    "nivel": 5
}


axios.post("http://api.oorden.com/v1/llaves/" + llave+ "/formulasv2/balanza-cctos", data_json).then(s => {
    console.log(s)
})
