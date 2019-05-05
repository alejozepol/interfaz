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
  senal: any    ={}
  id            = null
  divisas: any  = ['EURJPY', 'EURUSD', 'USDEUR']
  ordenes: any  = ['SELL', 'SELL STOP', 'SELL LIMIT', 'SELL STOP LIMIT', 'BUY', 'BUY STOP','BUY LIMIT', 'BUY STOP LIMIT']
  slActivo: any = ['SL1', 'SL2', 'SL3','SL4']
  user          = this.autorizacionServicios.datosUsuario()

  constructor(private senalesServicio: SenalesServicios,
              private activatedRoute: ActivatedRoute,
              private autorizacionServicios: AutorizacionSericios)
              {

               this.id =  this.activatedRoute.snapshot.params.id
               console.log(this.id)
              if( this.id != 'new'){
                this.id =  Number.parseInt(this.activatedRoute.snapshot.params.id)
                console.log('diferente a nuevo')
                this.senalesServicio
                      .getSenal(this.id)
                      .subscribe(senal => {
                          this.senal = senal[0]
                          this.FCrearSenal = new FormGroup({
                            grupoDivisa: new FormControl(this.senal.grupoDivisa,[Validators.required]),
                            lotaje: new FormControl(this.senal.lotaje,[Validators.required, Validators.min(0.01)] ),
                            orden: new FormControl(this.senal.orden,[Validators.required] ),
                            precioEntrada: new FormControl(this.senal.precioEntrada,[Validators.required, Validators.min(1)] ),
                            sl1: new FormControl(this.senal.sl1,[Validators.required, Validators.min(1)] ),
                            sl2: new FormControl(this.senal.sl2,[Validators.required, Validators.min(1)] ),
                            sl3: new FormControl(this.senal.sl3,[Validators.required, Validators.min(1)]),
                            sl4: new FormControl(this.senal.sl4,[Validators.required, Validators.min(1)]),
                            tp: new FormControl(this.senal.tp,[Validators.required, Validators.min(1)]),
                            estado: new FormControl(this.senal.estado),
                            tipo: new FormControl(this.senal.tipo),
                            slActivo: new FormControl(this.senal.slActivo,[Validators.required])
                          })


                                    })
              }

               }

               FCrearSenal = new FormGroup({
                 grupoDivisa  : new FormControl('',[Validators.required]),
                 lotaje       : new FormControl('',[Validators.required, Validators.min(0.01)] ),
                 orden        : new FormControl('',[Validators.required] ),
                 precioEntrada: new FormControl('',[Validators.required , Validators.min(1)] ),
                 sl1          : new FormControl('',[Validators.required, Validators.min(1)] ),
                 sl2          : new FormControl('' ,[Validators.required, Validators.min(1)] ),
                 sl3          : new FormControl('',[Validators.required, Validators.min(1)]),
                 sl4          : new FormControl('',[Validators.required, Validators.min(1)]),
                 tp           : new FormControl('',[Validators.required, Validators.min(1)]),
                 estado       : new FormControl(true),
                 tipo         : new FormControl('Premium'),
                 slActivo     : new FormControl('',[Validators.required])

               })

guardarSenal(){
this.senal = {
  grupoDivisa   : this.FCrearSenal.controls.grupoDivisa.value,
  lotaje        : this.FCrearSenal.controls.lotaje.value,
  orden         : this.FCrearSenal.controls.orden.value,
  precioEntrada : this.FCrearSenal.controls.precioEntrada.value,
  sl1           : this.FCrearSenal.controls.sl1.value,
  sl2           : this.FCrearSenal.controls.sl2.value,
  sl3           : this.FCrearSenal.controls.sl3.value,
  sl4           : this.FCrearSenal.controls.sl4.value,
  tp            : this.FCrearSenal.controls.tp.value,
  estado        : this.FCrearSenal.controls.estado.value,
  tipo          : this.FCrearSenal.controls.tipo.value,
  uid           : this.user.currentUser.uid,
  fecha         : new Date(),
  slActivo      : this.FCrearSenal.controls.slActivo.value
}

  if(this.id !='new'){
    console.log(this.senal)
    this.senalesServicio.editarsenal(this.id, this.senal)
    swal({
      title: `🤟🏻¡Señal modificada con exito!🤟🏽`,
       icon: 'success'
})

  }
  else{
    console.log(this.senal)
    this.senal.id = Date.now()
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
errorSl1() {
  return this.FCrearSenal.controls.sl1.hasError('required') ? 'SL1 es requerido' :
  this.FCrearSenal.controls.sl1.hasError('minLength') ? 'SL1  no Valido' : 'SL1  no Valido';
}
errorSl2() {
  return this.FCrearSenal.controls.sl2.hasError('required') ? 'SL2 es requerido' :
  this.FCrearSenal.controls.sl2.hasError('minLength') ? 'SL2 no Valido' : 'SL2 no Valido';
}
errorSl3() {
  return this.FCrearSenal.controls.sl3.hasError('required') ? 'SL3 es requerido' :
  this.FCrearSenal.controls.sl3.hasError('minLength') ? 'SL3 no Valido' : 'SL3 no Valido';
  }
errorSl4() {
  return this.FCrearSenal.controls.sl4.hasError('required') ? 'SL4 es requerido' :
  this.FCrearSenal.controls.sl4.hasError('minLength') ? 'SL4 no Valido' : 'SL4 no Valido';
  }
errorTp() {
  return this.FCrearSenal.controls.tp.hasError('required') ? 'TP es requerido' :
  this.FCrearSenal.controls.tp.hasError('minLength') ? 'TP no Valido' : 'TP no Valido';
  }

errorSlActivo() {
    return this.FCrearSenal.controls.slActivo.hasError('required') ? 'SL es requerido' :
    this.FCrearSenal.controls.slActivo.hasError('minLength') ? 'SL no Valido' : 'SL no Valido';
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
