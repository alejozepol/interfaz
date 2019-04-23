import { Component, OnInit } from '@angular/core';
import { AutorizacionSericios } from '../servicios/autorizacion.servicios';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder,Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit{
  paso = 1
  fechaActual = new Date()
  fechaMinima: number
  formRegistro= new FormGroup({
            nombres           : new FormControl('',[Validators.required,
                                                    Validators.minLength(3),
                                                    Validators.pattern("[a-zA-Z ]*")]),
            apellidos         : new FormControl('',[Validators.required,
                                                    Validators.minLength(3),
                                                    Validators.pattern("[a-zA-Z ]*")]),
            telefono          : new FormControl('',[Validators.required,
                                                    Validators.max(999999999999999),
                                                    Validators.min(111111)]),
            fechaNacimiento   : new FormControl('',[Validators.required

                                                    ]),
            email             : new FormControl('',[Validators.required, Validators.email]),
            clave             : new FormControl('',[Validators.required, Validators.minLength(6)])
  })

  constructor(private autorizacionService: AutorizacionSericios,
              private router:Router) {
                this.fechaActual.setFullYear(this.fechaActual.getFullYear()-12)
                this.fechaMinima = this.fechaActual.setFullYear(this.fechaActual.getFullYear()-12)

              }

ngOnInit(){


}

errorNombres() {
  return  this.formRegistro.controls.nombres.hasError('required') ? 'Nombres requeridos' :
          this.formRegistro.controls.nombres.hasError('minLength') ? 'Nombres no valido' : 'Numero de carecteres invalido'
    }
errorApellidos() {
  return  this.formRegistro.controls.apellidos.hasError('required') ? 'Apellidos requeridos' :
          this.formRegistro.controls.apellidos.hasError('minLength') ? 'Numero de carecteres invalido' : 'Numero de carecteres invalido'
    }

errorTelefono() {
  return  this.formRegistro.controls.telefono.hasError('required') ? 'Telefono requeridos' :
          this.formRegistro.controls.telefono.hasError('maxLength') ? 'Numero de carecteres invalido' : 'Numero de carecteres invalido'
        }
errorFechaNacimiento() {
  console.log(this.fechaMinima)
  return  this.formRegistro.controls.fechaNacimiento.hasError('required') ? 'Fecha de nacimiento requeridos' :
          this.formRegistro.controls.fechaNacimiento.hasError('min') ? 'Fecha de nacimiento no valido' : 'Numero de carecteres invalido'
    }
errorCorreo() {
     return this.formRegistro.controls.email.hasError('required') ? 'Correo electronico es requerido' :
     this.formRegistro.controls.email.hasError('email') ? 'Correo electronico no Valido' : '';
      }
errorClave() {
  return this.formRegistro.controls.clave.hasError('required') ? 'La contraseña es requerido' :
  this.formRegistro.controls.clave.hasError('minLength') ? 'La contraseña no Valido' : 'La contraseña no Valido';
  }

  registrar(){
    this.autorizacionService.guardarUsuario(this.formRegistro)
    this.autorizacionService.registro(
                this.formRegistro.controls.nombres,
                this.formRegistro.controls.email,this.formRegistro.controls.clave)
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
