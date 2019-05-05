import { Component, Injectable } from "@angular/core";
import { AutorizacionSericios } from '../servicios/autorizacion.servicios';
import { SenalesServicios } from '../servicios/senales.servicios';
import { Router } from '@angular/router';
declare const TradingView: any;
@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: '../deshboard/deshboard.componentes.html',
})


export class DeshboardComponentes{

  senales: any = []
  usuarios = null
  senal: any = {}
  vista = 0
  usuario: any = {}
  fechaActual = new Date
  constructor(private senalesServicio: SenalesServicios,
              private autorizacionservice: AutorizacionSericios, private router:Router){
/* console.log(this.fechaActual)

            senalesServicio.getSenales().valueChanges()
                           .subscribe(senales => {this.senales = senales}) */
this.datosUsuario()


  }

  datosUsuario(){
    this.autorizacionservice.datosUsuariosBD(this.autorizacionservice.uid)
    .subscribe(usuario => {this.usuario = usuario[0]
    console.log(this.usuario)
    if(this.usuario.usuarioPremium){
      this.senalesServicio.getSenales().valueChanges()
        .subscribe(senales => {this.senales = senales})
    }else{
      this.senalesServicio.consultaSenalCampoValor('tipo','Free')
      .subscribe(senales => {this.senales = senales})
    }
    })

  }
consularSenal(id){
 /*    this.vista = 1 */
/*     this.senales
        .forEach(e => {
          if (e.id === id) {
            this.senal=e
          }

        }) */

    this.senalesServicio.getSenal(id)
    .subscribe(senal => {
        this.senal = senal[0]
        new TradingView.widget({
        "width": 300,
        "height": 300,
        "symbol": `OANDA:${this.senal.grupoDivisa}`,
        "interval": "60",
        "timezone": "America/Lima",
        "theme": "Dark",
        "style": "1",
        "locale": "es",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "save_image": false,
        "container_id": "graficaTW",

      })
    })

  }


  anterior(){
  this.vista = 0
}
}
