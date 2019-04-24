import { Component } from "@angular/core";
import { AutorizacionSericios } from '../servicios/autorizacion.servicios';
import { SenalesServicios } from '../servicios/senales.servicios';


@Component({
  selector: 'app-root',
  templateUrl: '../deshboard/deshboard.componentes.html',
})

export class DeshboardComponentes{

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
   senales = null
   usuarios = null

  constructor(private senalesServicio: SenalesServicios,
              private autorizacionservice: AutorizacionSericios){

senalesServicio.getSenales().valueChanges()
              .subscribe(senales => this.senales = senales)

/* autorizacionservice.getUsuarios().valueChanges()
              .subscribe(usuarios => {
                this.usuarios =usuarios
              }
                ) */


  }

datosUsuario(){


}

}
