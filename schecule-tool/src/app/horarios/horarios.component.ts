import { Component, OnInit } from '@angular/core';

export interface horario {
  horas: string
  lunes: string
  martes: string
  miercoles: string
  jueves: string
  viernes: string
}


const GM11: horario[] = [
  { horas: "9-10", lunes: '', martes: "ED", miercoles: 'FI', jueves: 'FS', viernes: 'FI' },
  { horas: "10-11", lunes: '', martes: "ED", miercoles: 'FI', jueves: 'FS', viernes: 'FI' },
  { horas: "11-12", lunes: '', martes: "A", miercoles: 'EC', jueves: 'A', viernes: 'EC' },
  { horas: "12-13", lunes: '', martes: "A", miercoles: 'EC', jueves: 'A', viernes: 'EC' },
  { horas: "13-14", lunes: '', martes: "AS", miercoles: 'ED', jueves: '', viernes: 'A' },
  { horas: "14-15", lunes: '', martes: "AS", miercoles: 'ED', jueves: '', viernes: '' },
  { horas: "15-16", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "16-17", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "17-18", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "18-19", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "19-20", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "20-21", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' }
]
const GM12: horario[] = [
  { horas: "9-10", lunes: '', martes: "FI", miercoles: 'ED', jueves: 'FI', viernes: 'FS' },
  { horas: "10-11", lunes: '', martes: "FI", miercoles: 'ED', jueves: 'FI', viernes: 'FS' },
  { horas: "11-12", lunes: '', martes: "EC", miercoles: 'AS', jueves: 'EC', viernes: 'A' },
  { horas: "12-13", lunes: '', martes: "EC", miercoles: 'AS', jueves: 'EC', viernes: 'A' },
  { horas: "13-14", lunes: '', martes: "A", miercoles: 'A', jueves: 'ED', viernes: '' },
  { horas: "14-15", lunes: '', martes: "", miercoles: 'A', jueves: 'ED', viernes: '' },
  { horas: "15-16", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "16-17", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "17-18", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "18-19", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "19-20", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "20-21", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' }
]
const GM13: horario[] = [
  { horas: "9-10", lunes: '', martes: "A", miercoles: 'EC', jueves: 'A', viernes: 'EC' },
  { horas: "10-11", lunes: '', martes: "A", miercoles: 'EC', jueves: 'A', viernes: 'EC' },
  { horas: "11-12", lunes: '', martes: "ED", miercoles: 'FI', jueves: 'ED', viernes: 'AS' },
  { horas: "12-13", lunes: '', martes: "ED", miercoles: 'FI', jueves: 'ED', viernes: 'AS' },
  { horas: "13-14", lunes: '', martes: "", miercoles: 'A', jueves: 'FS', viernes: 'FI' },
  { horas: "14-15", lunes: '', martes: "", miercoles: '', jueves: 'FS', viernes: 'FI' },
  { horas: "15-16", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "16-17", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "17-18", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "18-19", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "19-20", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "20-21", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' }
]
const GM14: horario[] = [
  { horas: "9-10", lunes: '', martes: "AS", miercoles: 'A', jueves: 'EC', viernes: 'ED' },
  { horas: "10-11", lunes: '', martes: "AS", miercoles: 'A', jueves: 'EC', viernes: 'ED' },
  { horas: "11-12", lunes: '', martes: "FI", miercoles: 'ED', jueves: 'FI', viernes: 'FS' },
  { horas: "12-13", lunes: '', martes: "FI", miercoles: 'ED', jueves: 'FI', viernes: 'FS' },
  { horas: "13-14", lunes: '', martes: "EC", miercoles: '', jueves: 'A', viernes: 'A' },
  { horas: "14-15", lunes: '', martes: "EC", miercoles: '', jueves: '', viernes: 'A' },
  { horas: "15-16", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "16-17", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "17-18", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "18-19", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "19-20", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "20-21", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' }
]
const GM15: horario[] = [
  { horas: "9-10", lunes: '', martes: "EC", miercoles: 'AS', jueves: 'ED', viernes: 'ED' },
  { horas: "10-11", lunes: '', martes: "EC", miercoles: 'AS', jueves: 'ED', viernes: 'ED' },
  { horas: "11-12", lunes: '', martes: "A", miercoles: 'A', jueves: 'FI', viernes: 'FI' },
  { horas: "12-13", lunes: '', martes: "A", miercoles: 'A', jueves: 'FI', viernes: 'FI' },
  { horas: "13-14", lunes: '', martes: "", miercoles: 'EC', jueves: 'A', viernes: 'FS' },
  { horas: "14-15", lunes: '', martes: "", miercoles: 'EC', jueves: '', viernes: 'FS' },
  { horas: "15-16", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "16-17", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "17-18", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "18-19", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "19-20", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "20-21", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' }
]
const GT11: horario[] = [
  { horas: "9-10", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "10-11", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "11-12", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "12-13", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "13-14", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "14-15", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "15-16", lunes: '', martes: "EC", miercoles: '', jueves: '', viernes: 'A' },
  { horas: "16-17", lunes: '', martes: "EC", miercoles: '', jueves: 'A', viernes: 'A' },
  { horas: "17-18", lunes: '', martes: "AS", miercoles: 'A', jueves: 'EC', viernes: 'ED' },
  { horas: "18-19", lunes: '', martes: "AS", miercoles: 'A', jueves: 'EC', viernes: 'ED' },
  { horas: "19-20", lunes: '', martes: "FI", miercoles: 'ED', jueves: 'FI', viernes: 'FS' },
  { horas: "20-21", lunes: '', martes: "FI", miercoles: 'ED', jueves: 'FI', viernes: 'FS' }
]
const GT12: horario[] = [
  { horas: "9-10", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "10-11", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "11-12", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "12-13", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "13-14", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "14-15", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "15-16", lunes: '', martes: "", miercoles: 'A', jueves: 'ED', viernes: '' },
  { horas: "16-17", lunes: '', martes: "A", miercoles: 'A', jueves: 'ED', viernes: '' },
  { horas: "17-18", lunes: '', martes: "FI", miercoles: 'ED', jueves: 'FI', viernes: 'FS' },
  { horas: "18-19", lunes: '', martes: "FI", miercoles: 'ED', jueves: 'FI', viernes: 'FS' },
  { horas: "19-20", lunes: '', martes: "EC", miercoles: 'AS', jueves: 'EC', viernes: 'A' },
  { horas: "20-21", lunes: '', martes: "EC", miercoles: 'AS', jueves: 'EC', viernes: 'A' }
]
const GT13: horario[] = [
  { horas: "9-10", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "10-11", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "11-12", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "12-13", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "13-14", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "14-15", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "15-16", lunes: '', martes: "", miercoles: '', jueves: 'FS', viernes: 'FI' },
  { horas: "16-17", lunes: '', martes: "", miercoles: 'A', jueves: 'FS', viernes: 'FI' },
  { horas: "17-18", lunes: '', martes: "A", miercoles: 'EC', jueves: 'A', viernes: 'EC' },
  { horas: "18-19", lunes: '', martes: "A", miercoles: 'EC', jueves: 'A', viernes: 'EC' },
  { horas: "19-20", lunes: '', martes: "ED", miercoles: 'FI', jueves: 'ED', viernes: 'AS' },
  { horas: "20-21", lunes: '', martes: "ED", miercoles: 'FI', jueves: 'ED', viernes: 'AS' }
]

const GM21: horario[] = [
  { horas: "9-10", lunes: '', martes: "FIS", miercoles: 'FE', jueves: 'FIS', viernes: 'FE' },
  { horas: "10-11", lunes: '', martes: "FIS", miercoles: 'FE', jueves: 'FIS', viernes: 'FE' },
  { horas: "11-12", lunes: '', martes: "E", miercoles: 'PCA', jueves: 'E', viernes: 'PCA' },
  { horas: "12-13", lunes: '', martes: "E", miercoles: 'PCA', jueves: 'E', viernes: 'PCA' },
  { horas: "13-14", lunes: '', martes: "SI", miercoles: 'FIS', jueves: '', viernes: 'E' },
  { horas: "14-15", lunes: '', martes: "SI", miercoles: 'FIS', jueves: '', viernes: '' },
  { horas: "15-16", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "16-17", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "17-18", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "18-19", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "19-20", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "20-21", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' }
]

const GM22: horario[] = [
  { horas: "9-10", lunes: '', martes: "FE", miercoles: 'FIS', jueves: 'FE', viernes: 'FIS' },
  { horas: "10-11", lunes: '', martes: "FE", miercoles: 'FIS', jueves: 'FE', viernes: 'FIS' },
  { horas: "11-12", lunes: '', martes: "PCA", miercoles: 'SI', jueves: 'PCA', viernes: 'E' },
  { horas: "12-13", lunes: '', martes: "PCA", miercoles: 'SI', jueves: 'PCA', viernes: 'E' },
  { horas: "13-14", lunes: '', martes: "E", miercoles: 'E', jueves: 'FIS', viernes: '' },
  { horas: "14-15", lunes: '', martes: "", miercoles: 'E', jueves: 'FIS', viernes: '' },
  { horas: "15-16", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "16-17", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "17-18", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "18-19", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "19-20", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "20-21", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' }
]

const GM23: horario[] = [
  { horas: "9-10", lunes: '', martes: "E", miercoles: 'PCA', jueves: 'E', viernes: 'PCA' },
  { horas: "10-11", lunes: '', martes: "E", miercoles: 'PCA', jueves: 'E', viernes: 'PCA' },
  { horas: "11-12", lunes: '', martes: "FIS", miercoles: 'FIS', jueves: 'FIS', viernes: 'SI' },
  { horas: "12-13", lunes: '', martes: "FIS", miercoles: 'FIS', jueves: 'FIS', viernes: 'SI' },
  { horas: "13-14", lunes: '', martes: "", miercoles: 'E', jueves: 'FE', viernes: 'FE' },
  { horas: "14-15", lunes: '', martes: "", miercoles: '', jueves: 'FE', viernes: 'FE' },
  { horas: "15-16", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "16-17", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "17-18", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "18-19", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "19-20", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "20-21", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' }
]

const GT21: horario[] = [
  { horas: "9-10", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "10-11", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "11-12", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "12-13", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "13-14", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "14-15", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "15-16", lunes: '', martes: "SI", miercoles: 'FIS', jueves: 'PCA', viernes: 'FE' },
  { horas: "16-17", lunes: '', martes: "SI", miercoles: 'FIS', jueves: 'PCA', viernes: 'FE' },
  { horas: "17-18", lunes: '', martes: "FIS", miercoles: 'FE', jueves: 'FIS', viernes: 'E' },
  { horas: "18-19", lunes: '', martes: "FIS", miercoles: 'FE', jueves: 'FIS', viernes: 'E' },
  { horas: "19-20", lunes: '', martes: "PCA", miercoles: 'E', jueves: 'E', viernes: '' },
  { horas: "20-21", lunes: '', martes: "PCA", miercoles: 'E', jueves: '', viernes: '' }
]

const GT22: horario[] = [
  { horas: "9-10", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "10-11", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "11-12", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "12-13", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "13-14", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "14-15", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "15-16", lunes: '', martes: "PCA", miercoles: 'E', jueves: 'FIS', viernes: 'E' },
  { horas: "16-17", lunes: '', martes: "PCA", miercoles: 'E', jueves: 'FIS', viernes: 'E' },
  { horas: "17-18", lunes: '', martes: "FE", miercoles: 'PCA', jueves: 'FE', viernes: 'FIS' },
  { horas: "18-19", lunes: '', martes: "FE", miercoles: 'PCA', jueves: 'FE', viernes: 'FIS' },
  { horas: "19-20", lunes: '', martes: "FIS", miercoles: 'SI', jueves: 'E', viernes: '' },
  { horas: "20-21", lunes: '', martes: "FIS", miercoles: 'SI', jueves: '', viernes: '' }
]

const GCOM31: horario[] = [
  { horas: "9-10", lunes: '', martes: "AA", miercoles: 'TL', jueves: '', viernes: '' },
  { horas: "10-11", lunes: '', martes: "AA", miercoles: 'TL', jueves: '', viernes: '' },
  { horas: "11-12", lunes: '', martes: "SSR", miercoles: 'SSR', jueves: 'AA', viernes: 'TL' },
  { horas: "12-13", lunes: '', martes: "SSR", miercoles: 'SSR', jueves: 'AA', viernes: 'TL' },
  { horas: "13-14", lunes: '', martes: "PHW", miercoles: '', jueves: 'PHW', viernes: '' },
  { horas: "14-15", lunes: '', martes: "PHW", miercoles: '', jueves: 'PHW', viernes: '' },
  { horas: "15-16", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "16-17", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "17-18", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "18-19", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "19-20", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "20-21", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' }
]

const GIWM31: horario[] = [
  { horas: "9-10", lunes: '', martes: "", miercoles: 'BDA', jueves: 'ADS', viernes: 'BDA' },
  { horas: "10-11", lunes: '', martes: "", miercoles: 'BDA', jueves: 'ADS', viernes: 'BDA' },
  { horas: "11-12", lunes: '', martes: "TL", miercoles: 'EM', jueves: 'TL', viernes: 'EM' },
  { horas: "12-13", lunes: '', martes: "TL", miercoles: 'EM', jueves: 'TL', viernes: 'EM' },
  { horas: "13-14", lunes: '', martes: "CDI", miercoles: 'ADS', jueves: 'CDI', viernes: '' },
  { horas: "14-15", lunes: '', martes: "CDI", miercoles: 'ADS', jueves: 'CDI', viernes: '' },
  { horas: "15-16", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "16-17", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "17-18", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "18-19", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "19-20", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "20-21", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' }
]

const GIWT31: horario[] = [
  { horas: "9-10", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "10-11", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "11-12", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "12-13", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "13-14", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "14-15", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "15-16", lunes: '', martes: "CDI", miercoles: 'EM', jueves: 'EM', viernes: 'ADS' },
  { horas: "16-17", lunes: '', martes: "CDI", miercoles: 'EM', jueves: 'EM', viernes: 'ADS' },
  { horas: "17-18", lunes: '', martes: "ADS", miercoles: 'TL', jueves: 'CDI', viernes: 'TL' },
  { horas: "18-19", lunes: '', martes: "ADS", miercoles: 'TL', jueves: 'CDI', viernes: 'TL' },
  { horas: "19-20", lunes: '', martes: "BDA", miercoles: '', jueves: 'BDA', viernes: '' },
  { horas: "20-21", lunes: '', martes: "BDA", miercoles: '', jueves: 'BDA', viernes: '' }
]

const GSIT31: horario[] = [
  { horas: "9-10", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "10-11", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "11-12", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "12-13", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "13-14", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "14-15", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "15-16", lunes: '', martes: "MP", miercoles: 'PO', jueves: 'MP', viernes: 'SIG' },
  { horas: "16-17", lunes: '', martes: "MP", miercoles: 'PO', jueves: 'MP', viernes: 'SIG' },
  { horas: "17-18", lunes: '', martes: "MD", miercoles: 'TL', jueves: 'MD', viernes: 'TL' },
  { horas: "18-19", lunes: '', martes: "MD", miercoles: 'TL', jueves: 'MD', viernes: 'TL' },
  { horas: "19-20", lunes: '', martes: "BDA", miercoles: '', jueves: 'BDA', viernes: '' },
  { horas: "20-21", lunes: '', martes: "BDA", miercoles: '', jueves: 'BDA', viernes: '' }
]

const GTIM31: horario[] = [
  { horas: "9-10", lunes: '', martes: "", miercoles: 'TL', jueves: 'CU', viernes: 'CU' },
  { horas: "10-11", lunes: '', martes: "", miercoles: 'TL', jueves: 'CU', viernes: 'CU' },
  { horas: "11-12", lunes: '', martes: "SSR", miercoles: 'SSR', jueves: '', viernes: 'TL' },
  { horas: "12-13", lunes: '', martes: "SSR", miercoles: 'SSR', jueves: '', viernes: 'TL' },
  { horas: "13-14", lunes: '', martes: "", miercoles: 'RA', jueves: '', viernes: 'RA' },
  { horas: "14-15", lunes: '', martes: "", miercoles: 'RA', jueves: '', viernes: 'RA' },
  { horas: "15-16", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "16-17", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "17-18", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "18-19", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "19-20", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "20-21", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' }
]

const GMOPT41: horario[] = [
  { horas: "9-10", lunes: '', martes: "", miercoles: '', jueves: 'MTS', viernes: 'MTS' },
  { horas: "10-11", lunes: '', martes: "", miercoles: '', jueves: 'MTS', viernes: 'MTS' },
  { horas: "11-12", lunes: '', martes: "EPAC", miercoles: 'TDW', jueves: 'EPAC', viernes: 'TDW' },
  { horas: "12-13", lunes: '', martes: "EPAC", miercoles: 'TDW', jueves: 'EPAC', viernes: 'TDW' },
  { horas: "13-14", lunes: '', martes: "", miercoles: 'INM', jueves: '', viernes: '' },
  { horas: "14-15", lunes: '', martes: "", miercoles: 'INM', jueves: '', viernes: '' },
  { horas: "15-16", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "16-17", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "17-18", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "18-19", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "19-20", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "20-21", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' }
]

const GMOPT41a: horario[] = [
  { horas: "9-10", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "10-11", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "11-12", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "12-13", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "13-14", lunes: '', martes: "", miercoles: 'INA', jueves: '', viernes: '' },
  { horas: "14-15", lunes: '', martes: "", miercoles: 'INA', jueves: '', viernes: '' },
  { horas: "15-16", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "16-17", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "17-18", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "18-19", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "19-20", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "20-21", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' }
]
const GMOPT41b: horario[] = [
  { horas: "9-10", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "10-11", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "11-12", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "12-13", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "13-14", lunes: '', martes: "", miercoles: 'TCI', jueves: '', viernes: '' },
  { horas: "14-15", lunes: '', martes: "", miercoles: 'TCI', jueves: '', viernes: '' },
  { horas: "15-16", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "16-17", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "17-18", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "18-19", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "19-20", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "20-21", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' }
]

const GTOPT41: horario[] = [
  { horas: "9-10", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "10-11", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "11-12", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "12-13", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "13-14", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "14-15", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "15-16", lunes: '', martes: "AI", miercoles: 'DV', jueves: 'EPAC', viernes: 'DV' },
  { horas: "16-17", lunes: '', martes: "AI", miercoles: 'DV', jueves: 'EPAC', viernes: 'DV' },
  { horas: "17-18", lunes: '', martes: "EPAC", miercoles: 'SIA', jueves: 'AI', viernes: 'SIA' },
  { horas: "18-19", lunes: '', martes: "EPAC", miercoles: 'SIA', jueves: 'AI', viernes: 'SIA' },
  { horas: "19-20", lunes: '', martes: "GPS", miercoles: '', jueves: '', viernes: '' },
  { horas: "20-21", lunes: '', martes: "GPS", miercoles: '', jueves: '', viernes: '' }
]
const GTOPT42: horario[] = [
  { horas: "9-10", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "10-11", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "11-12", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "12-13", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "13-14", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "14-15", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "15-16", lunes: '', martes: "", miercoles: '', jueves: 'EPAC', viernes: '' },
  { horas: "16-17", lunes: '', martes: "", miercoles: '', jueves: 'EPAC', viernes: '' },
  { horas: "17-18", lunes: '', martes: "EPAC", miercoles: '', jueves: '', viernes: '' },
  { horas: "18-19", lunes: '', martes: "EPAC", miercoles: '', jueves: '', viernes: '' },
  { horas: "19-20", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' },
  { horas: "20-21", lunes: '', martes: "", miercoles: '', jueves: '', viernes: '' }
]




@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  displayedColumns: string[] = ['horas', 'lunes', 'martes', 'miercoles','jueves','viernes'];
  dataGM11 = GM11;
  dataGM12 = GM12;
  dataGM13 = GM13;
  dataGM14 = GM14;
  dataGM15 = GM15;
  dataGT11 = GT11;
  dataGT12 = GT12;
  dataGT13 = GT13;
  dataGM21 = GM21;
  dataGM22 = GM22;
  dataGM23 = GM23;
  dataGT21 = GT21;
  dataGT22 = GT22;
  dataGCOM31 = GCOM31;
  dataGIWM31 = GIWM31
  dataGIWT31 = GIWT31
  dataGSIT31 = GSIT31
  dataGTIM31 = GTIM31
  dataGMOPT41 = GMOPT41
  dataGMOPT41a = GMOPT41a
  dataGMOPT41b = GMOPT41b
  dataGTOPT41 = GTOPT41
  dataGTOPT42 = GTOPT42
}
