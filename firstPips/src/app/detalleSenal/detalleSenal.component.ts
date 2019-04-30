import { Component, OnInit } from "@angular/core";
import { SenalesServicios } from '../servicios/senales.servicios';
import { Router, ActivatedRoute,Params  } from '@angular/router';
import { DeshboardComponentes } from '../deshboard/deshboard.componentes';
import { Observable } from 'rxjs';


declare const TradingView: any;
@Component({
  selector: 'app-detalle-senal',
  templateUrl: './detalleSenal.component.html',
  styleUrls: ['./detalleSenal.component.css']
})
export class DetalleSenalComponent {

  senal :any = {}
  senales: any = []
  id: any = {};

  constructor(private senalesServicio: SenalesServicios,
    private activatedRoute: ActivatedRoute, private router:Router)
    { this.id =  Number.parseInt(this.activatedRoute.snapshot.params.id)
      this.consularSenal(this.id)
   }


consularSenal(id: number){
              this.senalesServicio.getSenal(id)
              .subscribe(senal => {
                console.log('metodo')
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

  }

