  
import requests;
 

llave = "llave"


data_json = {
    "cctos": ["CLOUD"],
    "fechaDesde" : "2022-01-01",
    "fechaHasta" : "2022-01-31",
    "incluirCeros": 1,
    "nivel": 5
}


r = requests.post("http://api.oorden.com/v1/llaves/" + llave+ "/formulasv2/balanza-cctos", json=data_json)
print( r.json() )