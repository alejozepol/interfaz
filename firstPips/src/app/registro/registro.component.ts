import { Component, OnInit } from '@angular/core';
import { AutorizacionSericios } from '../servicios/autorizacion.servicios';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  paso = 1
  registro : any ={}
  constructor(private autorizacionService: AutorizacionSericios,
              private router:Router) { }

  registrar(){
    this.autorizacionService.guardarUsuario(this.registro)
    this.autorizacionService.registro(this.registro.nombres,this.registro.email,this.registro.clave)
  }

  siguiente(){
    this.paso++
    if(this.paso ===3){
      this.router.navigate(['deshboard'])
  }}
  anterior(){
    if(this.paso ===1){
      this.router.navigate(['logueo'])
    }
    else{
      this.paso--
    }

  }

}
