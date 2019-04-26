import { Component, OnInit } from '@angular/core';
import { SenalesServicios } from '../servicios/senales.servicios';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import tw from './tv'


@Component({
  selector: 'app-detalle-senal',
  templateUrl: './detalleSenal.component.html',
  styleUrls: ['./detalleSenal.component.css']
})
export class DetalleSenalComponent {

  senal
  id = null
  constructor(private senalesServicio: SenalesServicios,
    private activatedRoute: ActivatedRoute, private router:Router) {
    this.id = this.activatedRoute.snapshot.params['id']
      if( this.id != 'new'){
    this.senal = this.senalesServicio.getSenal(this.id).valueChanges()
        .subscribe( senal => {this.senal = senal
          console.log(senal)
          console.log(this.senal)
          return senal

        } )

        console.log(this.senal)


    }


    }
}
