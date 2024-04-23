
# API Oorden

En este documento se describe el uso del API para clientes de OORDEN.

Para comenzar se debe solicitar un token al equipo comercial de OORDEN, pregunta con ellos también las opciones para generar un TOKEN DE PRUEBAS gratuito por 30 días (incluido también cuando tu paquete incluye acceso al API). El token es de formato JWT, y tiene vigencia de un año a partir de la generación. El token debe almacenarse de forma segura y todas las peticiones debes hacerlas mediante HTTPS para garantizar que el token permanece secreto. De cualqier forma, siempre puedes solicitar al equipo de oorden la baja de un token en el caso de que tengas sospecha de que ha sido vulnerado.

Todos los API-TOKEN están vinculados a una organizacion y a un usuario en concreto, una excelente idea para reconocer las operaciones que realiza el API dentro de la organización es generar un usuario específico para el token. De esta manera puedes identificar facilmente en las bitácoras cuáles operaciones se efectuaron mediante API.

Una vez solicitado el API-TOKEN al equipo de Oorden, éste se encargará de asegurarse para cuál organización y usuario debe ser generado y proporcionará, además del API-TOKEN se proporcionará el id del usuario y el id de la organizacion para usarse con dicho API-TOKEN, de tal forma que todas las solicitudes deben venir acompañadas de estos datos en los Headers Https de la siguiente manera:

```json
//En JSON
{
    "Authorization" : "Bearer <<API_TOKEN>>",
    "Usuarioid" : "<<USUARIO_ID>>",
    "Organizacionid" : "<<ORGANIZACION_ID>>"
}
```

```  
# En formato de texto para http headers

Authorization: Bearer <<API_TOKEN>>
Usuarioid: <<USUARIO_ID>>
Organizacionid : <<ORGANIZACION_ID>>
```

La url base que se utiliza en las peticiones al API es la siguiente  `https://erp.oorden.com/webapi/v2`, las peticiones al API reciben datos en los parametros de la URL y mediante el body en formato JSON (es necesario incluir para este propósito el header https `"ContentType: application/json"`)

## Uso del repositorio "oorden-api-test"

En este repositorio se muestran alginos ejemplos prácticos comunes para la consulta de datos desde el API, esttos ejemplos pueden ser de utilidad para los desarrolladores ayudandolos a acelerar la implementacion y facilitando las instalaciones iniciales.

El primer paso para iniciar con el uso de ejemplos provistos en este repositorio es asegurarse que tenemos los requerimientos para que funcione que son básicamente tener instaldo GIT y NODEJS 

Procedemos a clonar el repositorio en nuestra máquina, a través de una terminal se ejecutará el comando `git clone git@github.com:Iteraprocess/oorden-api-test.git` y luego `cd oorden-api-test` y ya dentro de la carpeta `npm install` para instalar las dependencias del proyecto.

Una vez concluido el proceso de instalacion de dependencias, procedemos a crear un archivo de nombre `data.json` dentro de la carpeta `organoizations`, tomaremos como referencia el archivo que se encuentra en dicha carpeta `examplev2.json` cuyo contenido es el siguiente:

```json 
{
    "Token": "{{Token}}",
    "OordenOrg" : "{{OrgId}}",
    "OordenUsr" : "{{UsrId}}",
    "Url" : "https://erp.oorden.com/webapi/v2"
}
``` 

Aqui sustituiremos los valores de acuerdo al token que queremos utilizar en los ejemplos (dejaremos el valor de URL intacto)

### Ejemplo de llamada "Información de la organización"

Como primer llamada vamos a realizar una solicitud GET al endpoint `organizaciones/org/info`. Este endpoint tiene como finalidad el comprobar la validez y vigencia de nuestro token y corroborar que corresponde a la organización que se quiere consultar. 

Ya que es una solicitud GET, y no hay parámetros adicionales que se requieran enviar en la misma, podemos consultar el código para nodejs de la petición en el archivo `/node-v2/organizacion-info.js`

Podemos ejecutar esta petición desde la terminal mediante el comando `node node-v2/organizacion-info.js` y veremos el resutlado de la repuesta, en este caso con inforacion de la organización en la que el token tiene acceso. Si hay un error aqui lo mas probalbe es que eltoken esté invalidado vencido, por tanto asegurate de haber colocado los valores correctos en el archivo `data.json`

Con este ejemplo tenemos una exposición general de cómo se invocan los endpoints del API de oorden. Vale la pena mencionar que a lo largo de la documentación tanto los datos de entrada en JSON como los de salida se documentarán con el formato de interfaces de TypeScript, ya que es la forma más extendida de documentación de tipos en la comunidad de JavaScript.

