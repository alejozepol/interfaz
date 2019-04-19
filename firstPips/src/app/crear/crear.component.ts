import { Component } from '@angular/core';
import { SenalesServicios } from '../servicios/senales.servicios';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent {
id = null
senal: any ={}

  constructor(private senalesServicio: SenalesServicios,
              private route: ActivatedRoute) {

              this.id = this.route.snapshot.params['id']
              if( this.id != 'new'){
                this.senalesServicio.getSenal(this.id).valueChanges()
                    .subscribe((senal) => this.senal = senal)
              }
               }


}
