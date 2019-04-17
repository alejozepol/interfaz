import { Component, OnInit } from '@angular/core';
import { AutorizacionSericios } from '../servicios/autorizacion.servicios';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  registro : any ={}
  constructor(private autorizacionService: AutorizacionSericios) { }


  registrar(){
    this.autorizacionService.registro(this.registro.email ,this.registro.clave)
  }


}
