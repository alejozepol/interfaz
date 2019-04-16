import { Component } from '@angular/core';
import { AutorizacionSericios } from '../servicios/autorizacion.servicios';

@Component({
  selector: 'app-logueo',
  templateUrl: './logueo.component.html',
  styleUrls: ['./logueo.component.css']
})
export class LogueoComponent {

  loginP : any ={}
  constructor( private autorizacionService: AutorizacionSericios) {
   }

   login(){
        this.autorizacionService.login(  this.loginP.email,this.loginP.clave)
   }

   facebookLogin(){
     this.autorizacionService.loginFacebook()
   }

   cerrar(){
     this.autorizacionService.logout()
   }


}
