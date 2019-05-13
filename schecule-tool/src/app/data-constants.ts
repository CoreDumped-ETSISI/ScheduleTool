const inicialDias = ["L", "M", "X", "J", "V"];
const horas = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
const auxCurso1 = ['GM11', 'GM12', 'GM13', 'GM14', 'GM15', 'GT11', 'GT12', 'GT13'];//Como los 2 primeros anos son comunes a todos los grados y tienen las mismas clases, 
const auxCurso2 = ['GM21', 'GM22', 'GM23', 'GT21', 'GT22'];//generamos esta estructura auxiliar para no repetir codigo.
const auxCurso4 = ['GMOPT41', 'GMOPT41a', 'GMOPT41b', 'GTOPT41', 'GTOPT42'];
const cursos = [//HAY QUE REVISAR ESTOS ARRAYS, LOS NOMBRES DE LOS GRUPOS DE 3º Y 4º ESTAN DISTINTOS EN EL JSON Y NO LOS ENCUENTRA CUANDO LLAMANMOS A cargarAsignatura().
[auxCurso1, auxCurso2, ['GIWM31', 'GIWT31'], auxCurso4],//Software
[auxCurso1, auxCurso2,['GCOM31'],auxCurso4],//Computadores
[auxCurso1, auxCurso2, ['GIWM31', 'GIWT31', 'GTIM31'], auxCurso4],//Sist. Informacion
[auxCurso1, auxCurso2, ['GTIM31'], auxCurso4],//Tech. Sociedad Inform.
]

export interface DataConstants {
  inicialDias, horas, auxCurso1, auxCurso2, auxCurso4, cursos
}
