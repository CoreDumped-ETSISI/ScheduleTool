import { Component, OnInit, Input } from '@angular/core';
import { HorariosService } from './horarios.service'
import {HttpClientModule } from '@angular/common/http'

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit {

  constructor(public horariosService: HorariosService) {

  }

  ngOnInit() {
    this.horariosService.getJson()
  }

  displayedColumns: string[] = ['horas', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
}
