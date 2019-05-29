import { Component, Injectable } from "@angular/core";
import { AutorizacionSericios } from '../servicios/autorizacion.servicios';
import { SenalesServicios } from '../servicios/senales.servicios';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material';
@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: '../deshboard/deshboard.componentes.html',
})


export class DeshboardComponentes{
  diasPrueba = 15
  senales: any = []
  usuarios = null
  senal: any = {}
  vista = 0
  usuario: any = {}
  fechaActual:any  = new Date()
  suscripciones: any = {}
  constructor(private senalesServicio: SenalesServicios,
              private autorizacionservice: AutorizacionSericios, private router:Router, private snackBar: MatSnackBar){
/* console.log(this.fechaActual)

            senalesServicio.getSenales().valueChanges()
                           .subscribe(senales => {this.senales = senales}) */

this.datosUsuario()
  }

  datosUsuario(){
    if(this.autorizacionservice.usuario.email){
    this.autorizacionservice.datosUsuariosBD(this.autorizacionservice.usuario.email)
    .subscribe(usuario => {
      this.usuario = usuario
    var dias =  this.diasSuscripcionPrueba(this.usuario.fechaRegistro.toDate())
    this.tipoSuscripcionUsuario(this.usuario.usuarioPremium,dias)
    })
  }else{
    this.autorizacionservice.logout()
  }

  }

public diasSuscripcionPrueba(fechaRegistro){
  return (this.fechaActual - fechaRegistro)/(1000*60*60*24)
}

public tipoSuscripcionUsuario(tipoUsuario,diasSuscripcion){

  if(tipoUsuario){
    this.senalesServicio.getSenales().valueChanges()
      .subscribe(senales => {
        this.senales = senales
        this.senales.forEach((senal, indice) => {
          this.senalesServicio.ConsultarDatosSuscripcionSenal(this.usuario.uid, senal.id)
          .subscribe(suscripcion => {
            if (suscripcion.length === 0) {
              this.senales[indice].suscripcion=false}
            else{
              this.senales[indice].suscripcion=true
            }
          })
          })
      })
  }else{
      if(this.diasPrueba>=diasSuscripcion){
        this.senalesServicio.getSenales().valueChanges()
        .subscribe(senales => {
          this.senales = senales
          this.senales.forEach((senal, indice) => {
            this.senalesServicio.ConsultarDatosSuscripcionSenal(this.usuario.uid, senal.id)
            .subscribe(suscripcion => {
              if (suscripcion.length === 0) {
                this.senales[indice].suscripcion=false}
              else{
                this.senales[indice].suscripcion=true
              }
            })
            })
          })
        this.snackBar.open(`Te quedan ${Math.round(this.diasPrueba-diasSuscripcion)} dias para que pruebes nuestros señales`,
                            'Cerrar',{duration:10000})

      }else{
        this.senalesServicio.consultaSenalCampoValorActivas('tipo','Free')
        .subscribe(senales => {this.senales = senales
          this.senalesServicio.ConsultarDatosSuscripcionSenal(this.usuario.uid, this.senal.id)
          .subscribe(suscripcion => this.senales.suscripcion=suscripcion)
          console.log(this.senales)})
        this.snackBar.open(`Te invitamos a que te suscribas para que veas todas las señales`,
        'Cerrar',{duration:10000})
      }


}
}

suscripcion(estado, sid){
  var usuarioSenal: any ={}

  usuarioSenal.uid = this.usuario.uid
  usuarioSenal.sid = sid
  this.senalesServicio.suscripcion( estado,usuarioSenal.uid, usuarioSenal.sid)
}

  anterior(){
  this.vista = 0
}

}
