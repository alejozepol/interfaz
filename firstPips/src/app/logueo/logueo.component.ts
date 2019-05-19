import { Component } from '@angular/core';
import { AutorizacionSericios } from '../servicios/autorizacion.servicios';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from'sweetalert';

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
  return this.formLogin.controls.email.hasError('required') ? 'El 📧 es requerido' :
  this.formLogin.controls.email.hasError('email') ? 'El 📧no Valido ' : '';
     }
errorClave() {
  return this.formLogin.controls.clave.hasError('required') ? 'La 🔐 es requerido' :
  this.formLogin.controls.clave.hasError('minLength') ? ' La 🔐 no Valido' : 'La 🔐 no Valido';
  }
errorTerminos() {
  return this.formLogin.controls.terminos.hasError('required')
            ? 'Terminos y Condiciones requerido 😎'  :
            'Terminos y Condiciones requerido 😎';
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
