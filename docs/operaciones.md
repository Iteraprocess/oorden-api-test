# Creación de una operación
 Para crear una operación es necesario invocar el webservice `POST /operaciones/operacion` con un objeto JSON con la siguiente estructura.

 ```TS 
 interface InputOperacion {
    operacion : Operacion
    items : Array<ItemOperacion>
    aplicar?: boolean
 }
 ```

En la operacion debe enviarse la información general de la operación (el encabezado)y en items un arreglo de objetos de tipo ItemOperacion que son cada uno de los ítems, partidas o conceptos de la operación

La propiedad `aplicar` especifica si la operación va a aplicarse para lo cual hay que enviar el valor `true` o simplemente quedará como borrador para lo cual hay que mandar `false`. Si no se especifica este valor queda en `false`, dicho de otra forma se queda en borrador.


 ### Estructuras de datos 

 #### Operación
 ```TS 
interface Operacion {
    tipoOperacion : "VTA" | "VNC" | "COM" | "CNC",
    fecha : string
    numero: null | string | number
    serie: null | string
    referencia : string
    fechaVencimiento: string
    moneda? : string
    tasaDeCambio? : string | number 
    terceroId? : string,
    tercero? : TerceroDeOperacion
    sucursalId? : null | string
    almacenId? : null | string
    usoCfdi : string
    metodoDePago : string
    formaDePago: string
}
```

Descripción:
 - **tipoOperacion:** especifica el tipo:
    - VTA: venta
    - VNC: nota de crédito de venta
    - COM: Compra
    - CNC: Nota de Crédito de Compra
- **fecha:** fecha de la operación (formato YYYY-MM-DD)
- **numero:** Número o folio del documento (si se asigna el valor NULL se asignará el siguiente número deisponible al momento de aplicar)
- **serie:** serie del documento (si se asigna el valor NULL se establece automáticamente)
- **referencia:** texto de referencia para control interno
- **fechaVencimiento:**  fecha de vencimiento de la operación (formato YYYY-MM-DD)
- **moneda** Moneda de la operacion, si no se especifica tomará la moneda base de la organización 
- **tasaDeCambio** en el caso de que la moneda no sea la moneda base de la organizacion se tomará este valor como tasa de cambio para la contabilización 
- **terceroId** especifica el cleinte o proveedor de la operacion, si se quiere relacionar mediante Id, si se omite este valor, entonces se tomarán los datos de "tercero"
- **tercero** espefiifica el cliente o proveedor relacionado (ver estructura TerceroDeOperacion)
- **sucursalId** se puede especificar una sucursal relacionada a la operación, en caso de no especificarse toma la sucursal por default
- **almacenId** se especifica el almacén. Esto es especialmente relevante en operaciones que generan un movimuento de inventario (el al macén del que salen las ventas o al que entrán las compras). En caso de no especifiacrse se asigna el almacen  por default de la sucursal.
- 



#### ItemOperacion


```TS 
interface ItemOperacion {
    productoId : string
    descripcion: string
    cantidad: string
    unidad?:  null | string,
    claveUnidad? : null | string,
    precioUnitario: string
    impuestoTrasladado: string
    impuestoRetenido?: null | string
}
```

 - **productoId:** Se debe especificar el id del producto en el concepto 
 - **descripcion:** El texto que se añade al item
 - **cantidad**: Es una string númerica y representa la cantidad del concepto/item
- **precioUnitario**: Es una string númerica y representa el precio unitario del concepto/item
- **impuestoTrasladado** Es la cadena que representa el impuesto que se traslada (ver opciones de impuestos)
- **impuestoRetenido** Es la cadena que representa el impuesto que se retiene (ver opciones de impuestos)





#### TerceroDeOperacion

```TS 
interface TerceroDeOperacion {
    claveFiscal : string
    nombre : string
    categoriaId? : string
}
```

Descripción: 

 - **claveFiscal:** Se debe especificar la clave fiscal (RFC) del cliente/proveedor
 - **nombre:** Se debe especificar el nombre (Razón Social) del cliente o proveedor 
 - **categoriaId**: es posible asignar la categoria en la que se crea el cliente


### Opciones de Impuestos 
En el apartado de Impuestos, se abordará el tema de impuestos de manera más extensiva, sin embargo para poder generar una operación es necesario asignar a cada item/concepto el impuesto que se traslada y es opcional asignar el impuesto que se retiene:

Los traslados, en el caso de México generalmente son el IVA 16% y el 
IVA 8% estos impuestos se asignan con la string `T|IVA|16.00` y `T|IVA|8.00` respectivamente.



