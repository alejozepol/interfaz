import { Component } from "@angular/core";
import { AutorizacionSericios } from '../servicios/autorizacion.servicios';
import { SenalesServicios } from '../servicios/senales.servicios';
import { Router } from '@angular/router';
declare const TradingView: any;
@Component({
  selector: 'app-root',
  templateUrl: '../deshboard/deshboard.componentes.html',
})


export class DeshboardComponentes{

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
   senales: any = []
   usuarios = null
   senal: any = {}
   vista = 0

  constructor(private senalesServicio: SenalesServicios,
              private autorizacionservice: AutorizacionSericios, private router:Router){

              senalesServicio.getSenales().valueChanges()
                            .subscribe(senales => this.senales = senales)


  }

consularSenal(id){
    this.vista = 1
    this.senales
        .forEach(e => {
          if (e.id === id) {
            this.senal=e
          }

        })

        new TradingView.widget({
          "width": 400,
          "symbol": `OANDA:${this.senal.grupoDivisa}`,
          "interval": "120",
          "timezone": "Etc/UTC",
          "theme": "Dark",
          "style": "1",
          "locale": "es",
          "toolbar_bg": "#f1f3f6",
          "enable_publishing": false,
          "hide_top_toolbar": true,
          "allow_symbol_change": true,
          "container_id": "graficaTW",
          'withdateranges': true,
          'hide_side_toolbar': false,
          'save_image': false,
          'hideideas': true,
          'studies': [
          'MASimple@tv-basicstudies' ],
          'show_popup_button': true,
          'popup_width': '1000',
          'popup_height': '650'
        })
  }


  anterior(){
  this.vista = 0
}
}
