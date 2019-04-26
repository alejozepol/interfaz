import { Component } from "@angular/core";
import { AutorizacionSericios } from '../servicios/autorizacion.servicios';
import { SenalesServicios } from '../servicios/senales.servicios';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: '../deshboard/deshboard.componentes.html',
})

export class DeshboardComponentes{

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
   senales: any = []
   usuarios = null
   senal = {}
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
        });
  }
  anterior(){
  this.vista = 0
}
}
