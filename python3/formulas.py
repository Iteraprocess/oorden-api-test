  
import requests;
 
llave = "llave" #Hay que poner la llave de la organizacion en cuestion para que funcione

data_json = {
    "cctos": ["CLOUD"], #Pones una lista de los centros de costo a buscar
    "fechaDesde" : "2022-01-01",
    "fechaHasta" : "2022-01-31",
    "incluirCeros": 1,
    "nivel": 5
}

#esta es la balanza x centros de costo
r = requests.post("http://api.oorden.com/v1/llaves/" + llave+ "/formulasv2/balanza-cctos", json=data_json)
print( r.json() )