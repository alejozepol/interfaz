import { Component } from '@angular/core';
import { SenalesServicios } from '../servicios/senales.servicios';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent {
  senal: any ={}
  id = null


  constructor(private senalesServicio: SenalesServicios,
              private route: ActivatedRoute) {

              this.id = this.route.snapshot.params['id']
              if( this.id != 'new'){
                this.senalesServicio.getSenal(this.id).valueChanges()
                    .subscribe((senal) => this.senal = senal)
              }
               }

               FDivisa = new FormControl()
               divisas: string[] = ['EURJPY', 'EURUSD', 'USDEUR'];

               FOrden = new FormControl()
               ordenes: string[] = ['SELL', 'SELL STOP', 'SELL LIMIT', 'SELL STOP LIMIT', 'BUY', 'BUY STOP','BUY LIMIT', 'BUY STOP LIMIT'];

guardarSenal(){
  this.senal.id = Date.now()
  this.senalesServicio.guardarSenal(this.senal)
  alert('Señal guardada con exito')
}

}
