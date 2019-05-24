# ScheduleTool
Porting cic.etsisi.upm.es/horarios to angular (and improving it)

//INSTALAR

npm install bootstrap

npm install --save @angular/material @angular/cdk @angular/animations

npm install ngx-bootstrap --save

npm install jspdf --save

npm install @types/jspdf --save-dev


//CALENDARIO
 
1. Instalar npm install --save @fullcalendar/angular @fullcalendar/core @fullcalendar/daygrid

### Sobre show schedules
Es una herramienta que permite la creación de horarios a partir de los horarios de todos los grupos de todos los cursos de todas las carreras de la ETSISI. 

Desde de la API se debe haber obtenido un fichero tipo .json con toda la información de las asignaturas. Esta información se carga y se genera la matriz donde se pondrán las asignaturas y sus horarios seleccionados (ver la aplicación para entender mejor). La mayor parte de funciones están en el fichero **schedule-start.service.ts**, estas funciones son para la lógica de la matriz principal y los botones de selección.

Hemos utilizado trazabilidad, la "librería" que hemos utilizado ha sido hecha por nosotros mismos y, corresponde a los ficheros **error.ts**, **errorTrace.ts** y **errorLine.ts**. La trazabilidad muestra los errores en consola y además hace una petición POST(guardar información) a la API para almacenar los errores en una carpeta llamada errors, en esta carpeta hay diferentes ficheros de texto, en el cual están los errores separados por el tipo de error.

### Cómo utilizar la herramienta
Lo primero de todo, hay que enlazar la herramienta con la API, actualmente está enlazada con una supuesta API local (http://localhost:3000), lo único que hay que hacer es acceder al fichero **network-constants.ts** cuya ruta es: ./schedule-tool/src/app/network/network-constants.ts y cambiar el endpoint/url (http://localhost:3000) por el obtenido al desplegar la API que viene junto con esta aplicación.


