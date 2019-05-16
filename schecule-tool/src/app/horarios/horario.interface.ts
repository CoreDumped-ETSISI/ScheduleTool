export interface horario {
    horas: string
    lunes: string
    martes: string
    miercoles: string
    jueves: string
    viernes: string
}


export interface grupos {
    nombreGrupo: string
    grupo: horario[]
    asignaturas: string[]
}

export interface cursos {
    cursoN: string
    grupos: grupos[]
}

export interface grados {
    grado: string
    gradoCode: string
    curso: cursos[]
  }