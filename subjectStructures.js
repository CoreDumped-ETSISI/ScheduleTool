const dias = ['l', 'm', 'x','j', 'v' ];
const horas = [9, 10 , 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] //Solo necesitamos saber a que hora empieza. Acaba a horas[i] + 1.
const grados  = [
            'Grado en Ingeniería del Software',
            'Grado en Ingeniería de Computadores',
            'Grado en Sistemas de Información',
            'Grado en Tecnologías para la Sociedad de la Información',
           // 'Doble Grado en Ingeniería de Computadores y en Tecnologías para la Sociedad de la Información',//De momento estos no estan disponibles porque no se que grupos tienen
           // 'Doble Grado en Ingeniería del Software y en Tecnologías para la Sociedad de la Información'//Igual que lo de arriba.
			];
const auxCurso1 = ['GM11', 'GM12', 'GM13', 'GM14', 'GM15', 'GT11', 'GT12', 'GT13', 'GT14'];//Como los 2 primeros anos son comunes a todos los grados y tienen las mismas clases, 
const auxCurso2 = ['GM21', 'GM22', 'GM23', 'GT21', 'GT22'];//generamos esta estructura auxiliar para no repetir codigo.
const cursos = [
	[auxCurso1, auxCurso2, ['GSWM31', 'GSWT31', 'GMOPT', 'GTOPT 1', 'GTOPT 2'], ['GSWM41', 'GSWT41', 'GMOPT', 'GTOPT 1', 'GTOPT 2']],//Software
	[auxCurso1, auxCurso2,['GCOM31', 'GMOPT', 'GTOPT 1', 'GTOPT 2'],['GCOT41', 'GMOPT', 'GTOPT 1', 'GTOPT 2']],//Computadores
	[auxCurso1, auxCurso2, ['GSIT31', 'GMOPT', 'GTOPT 1', 'GTOPT 2'], ['GSIM41', 'GMOPT', 'GTOPT 1', 'GTOPT 2']],//Sist. Informacion
	[auxCurso1, auxCurso2, ['GTIM31', 'GMOPT', 'GTOPT 1', 'GTOPT 2'], ['GTIT41', 'GMOPT', 'GTOPT 1', 'GTOPT 2']],//Tech. Sociedad Inform.
]
module.exports = {
	dias, 
	horas,
	grados,
	cursos,
}
