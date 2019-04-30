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
export class DetalleSenalComponent implements OnInit {

  senal :any = {}
  senales: any = []
  id: any;

  constructor(private senalesServicio: SenalesServicios,
    private activatedRoute: ActivatedRoute, private router:Router, private deshboard: DeshboardComponentes)
    { this.id = this.activatedRoute.snapshot.params['id']
      /* this.id = 1556242612963 */
      /* this.id = this.activatedRoute.snapshot.params['id'] */
   }


      ngOnInit(){
        /* this.id = this.activatedRoute.snapshot.paramMap.get('id') */
          console.log(this.id)

        /*   this.senales
              .forEach((e: { id: any; }) => {
                console.log(e.id)
                if (e.id === id) {
                  this.senal=e
                }

              }) */

              this.senalesServicio.getSenal(this.id)




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
            }



  }

