import { Component, OnInit } from '@angular/core';
import { SenalesServicios } from '../servicios/senales.servicios';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import tw from './tv'


@Component({
  selector: 'app-detalle-senal',
  templateUrl: './detalleSenal.component.html',
  styleUrls: ['./detalleSenal.component.css']
})
export class DetalleSenalComponent {

  senal: any ={}
  id = null
  constructor(private senalesServicio: SenalesServicios,
    private route: ActivatedRoute) {
    this.id = this.route.snapshot.params['id']
      this.senalesServicio.getSenal(this.id).valueChanges()
          .subscribe((senal) => this.senal = senal)

          console.log()
    }
}
