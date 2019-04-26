import { Component, OnInit } from '@angular/core';
import { SenalesServicios } from '../servicios/senales.servicios';
import { ActivatedRoute, Router } from '@angular/router';


declare const TradingView: any;
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


    }


    }
