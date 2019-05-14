import { Component } from '@angular/core';
import { AutorizacionSericios } from '../servicios/autorizacion.servicios';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-logueo',
  templateUrl: './logueo.component.html',
  styleUrls: ['./logueo.component.css']
})
export class LogueoComponent {

  loginP : any ={}
  constructor( private autorizacionService: AutorizacionSericios) {
   }

   formLogin = new FormGroup({
    email             : new FormControl('',[Validators.required, Validators.email]),
    clave             : new FormControl('',[Validators.required, Validators.minLength(6)]),
    terminos          : new FormControl('', [Validators.required,Validators.pattern("true")])
   })

errorCorreo() {
  return this.formLogin.controls.email.hasError('required') ? 'Correo electronico es requerido' :
  this.formLogin.controls.email.hasError('email') ? 'Correo electronico no Valido' : '';
     }
errorClave() {
  return this.formLogin.controls.clave.hasError('required') ? 'La contraseña es requerido' :
  this.formLogin.controls.clave.hasError('minLength') ? 'La contraseña no Valido' : 'La contraseña no Valido';
  }

   login(){
    this.loginP.email= this.formLogin.controls.email.value
    this.loginP.clave= this.formLogin.controls.clave.value
        this.autorizacionService.login(  this.loginP.email,this.loginP.clave)
   }

   facebookLogin(){
     this.autorizacionService.loginFacebook()
   }

   googleLogin(){
    this.autorizacionService.loginGoogle()
  }

   cerrar(){
     this.autorizacionService.logout()
   }

   olvideClave(){
    this.loginP.email= this.formLogin.controls.email.value
     this.autorizacionService.restablecerClave(this.loginP.email)
   }
}
