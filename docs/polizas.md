# API para pólizas

En oorden, las pólizas son los registros contables. Las pólizas también son conocidas como "entradas de diario", "asientos contables", etc. Existen pólizas manuales o automáticas.

Las pólizas automáticas son generadas a través de otros movimientos (operaciones, movimientos de inventario, ingresos/egresos, etc). Estas pólizas no pueden modificarse directamente sino a través de modificar los movimientos que las originan

Mientras que las pólizas manuales son generadas manualmente por los usuarios, también es posible generar una póliza manual de manera "inteligente" mediante el uso de la herramienta "Póliza de Cierre" y aunque se puede decir que esta es una póliza "automática", en oorden no la consideramos así ya que es resultado de una acción directa de el usuario y no propiamente de un movimiento que la origina, además de que una póliza de cierre puede modificarse directamente por el usuario una vez que fue creada por oorden.

Las pólizas tienen 3 estatus posibles:
- En Preparación (P)
- Aplicada (A)
- Cancelada (X)
 
Las pólizas en preparación sirven como pólizas en borrador y no afectan los registros contables, ni las balanzas y por consiguiente ningún reporte.

Las pólizas aplicadas, en cambio, son aquellas que sí afectan los registros contables y los reportes. Por otra parte, las pólizas canceladas tampoco afectan a los registros contables, pero son aquellas que en un momento dado sí estuvieron aplicadas pero por alguna razón se cancelan (en algunos países esto se le conoce como anular). 

Por tanto, una póliza cancelada o anulada no funge en los libros contables, solamente es histórica es decir ya no puede editarse. **No confundir este estatus “Cancelación” con el concepto de cancelar utilizado en algunos países como Colombia que equivale a saldar o pagar una factura.**


### Listado o búsqueda de pólizas
El primer endpoint a utilizar es el de búsqueda de Polizas, para dicho endpoint es necesario invocar:

```
GET polizas/listado
```

Puedes correr el ejemplo incluido en el repositorio con el comando `node node-v2/polizas/listado` el cual te devolverá las últimas 50 polizs (las más nuevas)

#### Solicitud

Esta llamada acepta parámetros a través de la query url, que pueden ser los siguientes

- `fecha=`: fecha de la creacion. Acepta las variantes
    - `fecha>=` para fechas mayores (posteriores) o iguales a una fecha en particular y
    - `fecha<=`  para fechas menores (anteriores) o iguales a una fecha en particular
- `numero=`: para buscar por un número en concreto 
- `tipo=`: para buscar por un tipo en concreto (D,I,'E')
- `referencia=`:
- `busqueda=` : 



#### Respuesta

```typescript
//La respuesta es un arreglo de Elementos de tipo "PolizaListItem"
type PolizaList = Array<PolizaListItem>
```

Los cuales se definen a continuación:

```typescript
/*
D = Diario
I = Ingreso
E = Egreso
*/
type TipoPoliza = 'D' | 'I' | 'E';

/*
P = en Preparacion
A = Aplicada
X = Cancelada/Anulada
*/
type EstatusPoliza = 'P' | 'A' | 'X' ;

/**
 * null = Poliza Normal
 * A = Polzia de ajuste
 * C = Poliza de cierre
 */
type AjusteOCierre = null | 'A' | 'C';


interface PolizaListItem {
    id : string
    poliza : string
    numero : string
    fecha : string
    referencia : string
    tipo : TipoPoliza
    totalCargos : string  /*Numérico*/
    totalAbonos : string /*Numérico*/
    ajusteOCierre : AjusteOCierre
}
```

<hr />

### Consulta de Pólizas
Se utiliza para obtener los datos de una póliza en concreto.

```
GET /polizas/poliza/{polizaId}
```

#### Respuesta

```typescript
interface PolizaResp {
    poliza: PolizaRespData,
    partidas: Array<PolizaRespPartidaData>
}
```

```typescript
interface PolizaRespData {
    id: string
    numero : string /*Numérico*/
    fecha : string
    concepto:string
    referencia : string
    tipo : TipoPoliza
    ajusteOCierre : AjusteOCierre
}

interface PolizaRespPartidaData {
    id : string
}
```


<hr />

### Creación de pólizas

Como es sabido, una póliza se compone de la estructura principal y de las partidas, para introducir una partida es necesario saber a cuál `cuenta contable` va a afectar, en oorden se tiene la flexibilidad de identificar las cuentas contables a traves de su "número de cuenta" (campo `cuenta`) o su `id`.

La llamada para crear una póliza es:


```
POST /polizas/poliza
```

#### Solicitud 

Esta llamada acepta el parámetro aplicar a través de la query url: 

- `aplicar=`: Acepta los valores `true` o `false`. Si es `true` y la póliza está en preparación se cambia al estatus `A` (aplicado).


**JSON-BODY**

```typescript
/*
D = Diario
I = Ingreso
E = Egreso
*/
type TipoPoliza = 'D' | 'I' | 'E';


/**
 * null = Poliza Regular
 * A = Polzia de ajuste
 * C = Poliza de cierre
 */
type AjusteOCierre = null | 'A' | 'C';


interface PolizaData {
    numero : string /*Numérico*/
    fecha : string
    concepto:string
    referencia : string
    tipo : TipoPoliza
    ajusteOCierre : AjusteOCierre
}


interface PartidaData {
    concepto : string
    cuentaId : string | null
    cargo : string /* Numérico */
    abono : string /* Numérico */
    elem1Id : string | null
    elem2Id : string | null
}
```


#### Respuesta
(Ver respuesta de Consulta de Póliza)

<hr />

### Edición de pólizas

Para modificar las pólizas. El endpoint es el siguiente:

```
POST /polizas/poliza/{polizaId}
```

#### Solicitud


Esta llamada acepta el parámetro aplicar a través de la query url: 

- `aplicar=`: Acepta los valores `true` o `false`. Si es `true` y la póliza está en preparación se cambia al estatus `A` (aplicado)

**JSON-BODY**
```typescript
/*
D = Diario
I = Ingreso
E = Egreso
*/
type TipoPoliza = 'D' | 'I' | 'E';


/**
 * null = Poliza Regular
 * A = Polzia de ajuste
 * C = Poliza de cierre
 */
type AjusteOCierre = null | 'A' | 'C';


interface PolizaData {
    numero? : string /*Numérico*/
    fecha? : string
    concepto?:string
    referencia? : string
    tipo? : TipoPoliza
    ajusteOCierre? : AjusteOCierre
}


interface PartidaData {
    concepto? : string
    cuentaId? : string | null
    cargo? : string /* Numérico */
    abono? : string /* Numérico */
    elem1Id? : string | null
    elem2Id? : string | null
}
```


#### Respuesta
(Ver respuesta de Consulta de Póliza)


<hr />

### Anular (cancelar) pólizas

Se utiliza para que una póliza que está aplicada deje de fungir en los libros contables y reportes, por tanto toma el estatus `X` ("cancelada" o "anulada")

```
POST /polizas/poliza/{polizaId}/anular
```

#### Respuesta

(Ver respuesta de Consulta de Póliza)