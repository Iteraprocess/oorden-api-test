

# API Oorden v2

Para utilizar el API version 2 de Oorden es necesario tener los datos:

* OrganizacionId
* UsuarioId
* Token (este token es el API KEY que será proporcionado por el equipo de oorden)

Se trata de un API que utiliza JSON REST.
En cada Request, es necesario icluir en los headers los valores: 

* **OordenOrg** => {{OrganizacionId}}
* **OordenUsr** =>  {{UsuarioId}}
* **Authentication** => Bearer {{Token}}


Si los datos de autenticación son incorrectos el api responderá con el error "Wrong Authentication".

Para iniciar a utilizar clona el repositiorio y en la terminal instalas las dependencias `npm install` a continuacion crea un archivo `miEmpresa.json` en la carpeta `/organizations`. Básate en el ejemplo que viene en el archivo `examplev2.json` sustituyendo los datos que se piden.

A continuación en el archivo que se encuentra en la carpeta raíz `data.js` cambia la ruta para que incluya `./organizations/miEmpresa.json`

Puedes tener un archivo .json por cada empresa que utilices y asi solamente cambiar en `data.js` la empresa que vas a utilizar cada que quieras.


## Reportes


### Auxiliar de Polizas

#### Solicitud
- Url : /webapi/v2/reportes/contable/auxiliar/{{cuenta}}
- Method : GET
- cuenta: El valor en cuenta puede ser cualquier numero de cuenta existente en la organizacion o un id de cuenta contable
- Query:
    - FechaDesde: Fecha inicial en formato YYYY-mm-dd
    - FechaHasta: Fecha final en formato YYYY-mm-dd


 #### Estructura de la respuesta

- **cuenta**
    - **id**: id de la cuenta contable encontrada
    - **cuenta**: numero de cuenta de la cuenta contable
    - **nombre**: nombre de la cuenta contable
    - **naturaleza**: 'D' = Deudora | 'A' = Acreedora
    - **nivel**: nivel en el arbol de cuentas contables (1 = cuenta de mayor)
    - **esBancos** : 1 = Sí | 0 = No
    - **fkCuentaPadre**: id de la cuenta superior (en el caso de no ser de nivel 1)
    - **saldoInicial**: Saldo inicial de la cuenta a la fecha desde
    - **saldoFinal**: Saldo fina de la cuenta a la fecha hasta
    - **auxiliar**: Array[], arreglo de movimientos de la cuenta en el periodo de fechas consultado
        - **id**: id de la partida de la poliza
        - **fkPoliza**: id de la poliza
        - **fecha** : fecha de la poliza
        - **concepto**: concepto de la partida
        - **poliza** : Nombre/Etiqueta de la póliza
        - **fkMovimiento**: id | null, el id del movimiento bancario correspondiente 
        - **fkTercero**: El tercero depende del tipo de movimiento quien paga o quien recibe el dinero
        - **nombreTercero**: Nombre de quien paga o recibe el dinero
        - **claveFiscalTercero**: clave fiscal de quien paga o recibe el dinero
        - **cargo**: si el movimiento carga o null
        - **abono**: si el movimiento abona o null