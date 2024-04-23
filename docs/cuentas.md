# API para cuentas contables 

Las cuentas en Oorden tienen una estructura de arbol, es decir que se acumulan o anidan de aceurdo al numero de cuenta o código que se asigna. 

Por ejemplo, las cuentas por default tienen la siguiente estructura 111-22-33-444. Esta estructura es de 4 niveles, y cada nivel tiene digitos significativos en cada uno de los bloques señalados, esto es, todas las cuentas de nivel uno van a tener valores llenos significativos en el bloque 1 pero en los demas tendran el valor cero (por ejemplo : 105-00-00-000)

Las subcuentas de una determinada cuenta de nivel uno, van a tener en el bloque uno el mismo valor pero van a tener tambien un valor significativo en el bloque 2 (siguiendo el ejemplo: 105-01-00-000). Del mismo modo las cuentas de nivel 3 tendrán el valor heradado de su cuenta padre del bloque 2 (y por tanto tambien del bloque 1) pero teniendo tambien un valor significativo en el bloque 3 (ejemplo 105-01-07-000). Y asi sucesivamente

Se pueden configurar estructuras de cuentas personalizadas, sin embargo esto obliga a reestructurar el catállgo de cuentas y solo es recomendado cuendo sea a bsolutamente necesario.

## Tipos de datos para cuentas

```typescript
type NaturalezaCuenta = 'A' | 'D'
```

## Árbol de cuentas 

Este endpoint devuelve un arreglo con todas las cuentas de la organizacion independientemente de su nivel y estatus.

```
GET /cuentas/arbol
```

#### Respuesta

```typescript
interface Respuesta_ArbolCuentas {
    arbolCuentas: CuentaArbolItem[]
}
```

Los cuales se definen a continuación:


```typescript

/**
 * D = Deudora
 * A = Acreedora
 */
type NaturalezaCuenta = 'A' | 'D'

/*
* 1 Activa
* 0 Inactiva / No visible
*/
type EstatusCuenta = 0 | 1 


interface CuentaArbolItem {
    id : string,
    cuenta : string,
    nombre : string,
    
    /*Ver Tipos de Cuentas */
    tipoId : TipoDeCuenta 
    
    naturaleza : NaturalezaCuenta
    
    /*Es acumulativa, es decir no pueden asingarse partidas directamente */
    acumulativa: 1 | 0, 
    
    /* Nivel de la cuenta, empezando por 1 para las cuentas de mayor*/
    nivel: number, 
    
    /*Referencia al id de la cuenta padre, si el nivel es cero no tiene padre, por tanto su valor es null */
    subcuentaDe : null | string, 
    
    estatus: EstatusCuenta
}
```


## Consultar cuenta individualmente

Para consultar una cuenta individualente invocamos el siguiente endpoint.

```
GET /cuentas/cuenta/{cuentaOId}
```

Nótese que ponemos `cuentaOId` en vez de `cuentaId` ya que en este caso podemos invocar este endpoint tanto por el numero de cuenta como por su id. YA que dentro de una organizacion un numero de cuenta no es repetible.

### Respuesta

```typescript
interface Respuesta_Cuenta {
    cuenta: CuentaItem
}
```


```typescript

/**
 * D = Deudora
 * A = Acreedora
 */
type NaturalezaCuenta = 'A' | 'D'

/*
* 1 Activa
* 0 Inactiva / No visible
*/
type EstatusCuenta = 0 | 1 


interface CuentaItem {
    id : string,
    cuenta : string,
    nombre : string,
    
    /*Ver Tipos de Cuentas */
    tipoId : TipoDeCuenta 
    
    naturaleza : NaturalezaCuenta
    
    /*Es acumulativa, es decir no pueden asingarse partidas directamente */
    acumulativa: 1 | 0, 
    
    /* Nivel de la cuenta, empezando por 1 para las cuentas de mayor*/
    nivel: number, 
    
    /*Referencia al id de la cuenta padre, si el nivel es cero no tiene padre, por tanto su valor es null */
    subcuentaDe : null | string, 
     
    estatus: EstatusCuenta,

    descripcion: string

    esBanco : 1 | 0

    banco:  string

    cuentaBancaria: string
}
```

## Consultar subcuentas de una cuenta 

Es posible consultar las cuentas que son hijas directamente d euna cuenta mediante el siguiente endpoint:


```
GET /cuentas/cuenta/{cuentaOId}/subcuentas
```

### Respuesta

```typescript
interface Respuesta_Subucentas {
    subcuentas: CuentaArbolItem[] /*Ver respuesta de árbol de cuentas */
}
```


## Crear una subcuenta

Dada una cuenta es posible crear una subcuenta (una hija directa de la cuenta).

```
POST /cuentas/cuenta/{cuentaOId}/subcuenta
```

En donde el identificador de la cuenta puede ser el id o el numero de cuenta. Este proceso puede invocarse solamente sobre cuentas que sean acumulativas. Si la cuenta no es acumulativa se intentará convertir en acumulativa, pero si la cuenta ya tiene movimientos (partidas de póliza) asignados se lanzará un error que lo indica.

### Solicitud 

**JSON-BODY** 

``` typescript 
interface Solicitud_CrearSubcuenta {
    nombre : string
    cuenta? : NumeroDeCuenta
    descripcion? : string
    esBanco? : 1 | 0
    banco? :null | string
    cuentaBancaria? : null | string
}
```

Lo único que se necesita para crear una subcuenta es proveer el `nombre`. Si el número de cuenta (`cuenta`) no es establecido se asginará de manera automática el siguiente disponible. Tambien se puede proveer una descripción.

Se puede proveer tambien un numero de cuenta preasignado, no obstante este debe estar libre y corresponder a un numero de cuenta  que sea hijo de la cuenta padre.

Si se quiere crear una cuenta de banco debe proveerse el valor `esBanco=1`, tambien se puede proveer un nombre del banco y un numero de cuenta bancaria para mayor control.

Los otros campos involucrados en una cuenta no se pueden asignar ya que se heredan de la cuenta de mayor  siempre. Es decir la `naturaleza` es igual a la de la cuenta padre y el mismo caso para el `tipoCuenta`. El `nivel` el valor de `acumulativa` se asigna de manera automática

### Respuesta


``` typescript 
interface Respuest_CrearSubcuenta {
    /** Ver respuesta de la consulta individual de cuenta */
    cuenta: CuentaItem 
}
```




