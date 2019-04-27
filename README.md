# ScheduleTool
Porting cic.etsisi.upm.es/horarios to angular (and improving it)


//AÑADIR EVENTOS A CALENDARIO

1. Añadir a 'angular.json' dentro de 'assets' "src/json" para poder hacer llamada http al json
2. Importar Http a 'app.module.ts'
3. Importar Http a 'calendar.service.ts'
4. Funcion getEventos() en service, lee los datos del json 
5. Llamada a los datos recogidos desde el ngOnInit del 'schedule-monthly.component.ts' para cargar los eventos del calendario al inicio 
