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
    .subscribe(usuario => {this.usuario = usuario
    var dias = (this.fechaActual-this.usuario.fechaRegistro.toDate())/(1000*60*60*24)
    /* console.log(dias) */
    if(this.usuario.usuarioPremium){
      this.senalesServicio.getSenales().valueChanges()
        .subscribe(senales => {this.senales = senales})
    }else{
        if(this.diasPrueba>=dias){

          this.senalesServicio.getSenales().valueChanges()
          .subscribe(senales => {this.senales = senales})
          this.snackBar.open(`Te quedan ${Math.round(this.diasPrueba-dias)} dias para que pruebes nuestros señales`,
                              'Cerrar',{duration:10000})

        }else{
          this.senalesServicio.consultaSenalCampoValorActivas('tipo','Free')
          .subscribe(senales => {this.senales = senales})
          this.snackBar.open(`Te invitamos a que te suscribas para que veas todas las señales`,
          'Cerrar',{duration:10000})
        }

    }
    })
  }else{
    this.autorizacionservice.logout()
  }

  }



  anterior(){
  this.vista = 0
}

}
