import { Component } from '@angular/core';
import { SenalesServicios } from '../servicios/senales.servicios';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import swal from'sweetalert';
import { AutorizacionSericios } from '../servicios/autorizacion.servicios';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent {
  senal: any   ={}
  id           = null
  divisas: any = ['EURJPY', 'EURUSD', 'USDEUR']
  ordenes: any = ['SELL', 'SELL STOP', 'SELL LIMIT', 'SELL STOP LIMIT', 'BUY', 'BUY STOP','BUY LIMIT', 'BUY STOP LIMIT']
  user         = this.autorizacionServicios.datosUsuario()

  constructor(private senalesServicio: SenalesServicios,
              private route: ActivatedRoute,
              private autorizacionServicios: AutorizacionSericios)
              {

              this.id = this.route.snapshot.params['id']
              if( this.id != 'new'){
                this.senal = this.senalesServicio.getSenal(this.id)
              }

               }

               FCrearSenal = new FormGroup({
                 grupoDivisa: new FormControl('',[Validators.required]),
                 lotaje: new FormControl('',[Validators.required] ),
                 orden: new FormControl('',[Validators.required] ),
                 precioEntrada: new FormControl('',[Validators.required] ),
                 sl: new FormControl('',[Validators.required] ),
                 tp1: new FormControl('',[Validators.required] ),
                 tp2: new FormControl('',[Validators.required]),
                 tp3: new FormControl('',[Validators.required]),
                 estado: new FormControl(true),
                 tipo: new FormControl('Premium'),

               })

guardarSenal(){
this.senal = {
  grupoDivisa   : this.FCrearSenal.controls.grupoDivisa.value,
  lotaje        : this.FCrearSenal.controls.lotaje.value,
  orden         : this.FCrearSenal.controls.orden.value,
  precioEntrada : this.FCrearSenal.controls.precioEntrada.value,
  sl            : this.FCrearSenal.controls.sl.value,
  tp1           : this.FCrearSenal.controls.tp1.value,
  tp2           : this.FCrearSenal.controls.tp2.value,
  tp3           : this.FCrearSenal.controls.tp3.value,
  estado        : this.FCrearSenal.controls.estado.value,
  tipo          : this.FCrearSenal.controls.tipo.value,
  uid           : this.user.currentUser.uid,
  fecha         : new Date()
}

  if(this.id !='new'){
    this.senalesServicio.editarsenal(this.senal)
    swal({
      title: `🤟🏻¡Señal modificada con exito!🤟🏽`,
       icon: 'success'
})

  }
  else{
    this.senal.id = Date.now(),
    this.senalesServicio.guardarSenal(this.senal)
    swal({
      title: `🤩¡Señal Agrego con exito!🤩`,
       icon: 'success'
})

}}

errorGrupoDivisa() {
  return this.FCrearSenal.controls.grupoDivisa.hasError('required') ? 'El grupo de divisa es requerido' :
  this.FCrearSenal.controls.grupoDivisa.hasError('minLength') ? 'El grupo de divisa no Valido' : 'El grupo de divisa no Valido';
  }

errorLotaje() {
  return this.FCrearSenal.controls.lotaje.hasError('required') ? 'El lotaje es requerido' :
  this.FCrearSenal.controls.lotaje.hasError('minLength') ? 'El lotaje no Valido' : 'El lotaje no Valido';
  }
errorOrden() {
    return this.FCrearSenal.controls.orden.hasError('required') ? 'La orden es requerido' :
    this.FCrearSenal.controls.orden.hasError('minLength') ? 'La orde no Valido' : 'La orden no Valido';
    }
errorPrecioEntrada() {
      return this.FCrearSenal.controls.precioEntrada.hasError('required') ? 'El precio de entrada es requerido' :
      this.FCrearSenal.controls.precioEntrada.hasError('minLength') ? 'El precio de entradano Valido' : 'El precio de entrada no Valido';
      }
errorSl() {
return this.FCrearSenal.controls.sl.hasError('required') ? 'SL es requerido' :
this.FCrearSenal.controls.sl.hasError('minLength') ? 'SL  no Valido' : 'SL  no Valido';
}
errortp1() {
return this.FCrearSenal.controls.tp1.hasError('required') ? 'TP1 es requerido' :
this.FCrearSenal.controls.tp1.hasError('minLength') ? 'TP1 no Valido' : 'TP1 no Valido';
}
errortp2() {
  return this.FCrearSenal.controls.tp2.hasError('required') ? 'TP2 es requerido' :
  this.FCrearSenal.controls.tp2.hasError('minLength') ? 'TP2 no Valido' : 'TP2 no Valido';
  }
errortp3() {
  return this.FCrearSenal.controls.tp3.hasError('required') ? 'TP3 es requerido' :
  this.FCrearSenal.controls.tp3.hasError('minLength') ? 'TP3 no Valido' : 'TP3 no Valido';
  }
/* errorEstado() {
  return this.FCrearSenal.controls.estado.hasError('required') ? 'El estado es requerido' :
  this.FCrearSenal.controls.estado.hasError('minLength') ? 'El estado no Valido' : 'El estado no Valido';
  }
errorTipo() {
  return this.FCrearSenal.controls.tipo.hasError('required') ? 'El tipo es requerido' :
  this.FCrearSenal.controls.tipo.hasError('minLength') ? 'El tipo no Valido' : 'El tipo no Valido';
  } */
}
