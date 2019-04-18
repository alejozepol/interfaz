import { Component, OnInit } from '@angular/core';
import { AutorizacionSericios } from './servicios/autorizacion.servicios';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'firstPips';
  loggedIn =false;
  usuario: any = null

  constructor( private autorizacionService: AutorizacionSericios, private swUpdate: SwUpdate){

      this.autorizacionService.islogged()
        .subscribe((resultado)=>{
          if  (resultado && resultado.uid){

              this.loggedIn = true
              setTimeout(()=>{
                this.usuario =this.autorizacionService.getUsuario().currentUser.email
              },500)

              // console.log(this.usuario)
          }
          else{

            this.loggedIn = false
          }
        }, (error) =>{
          this.loggedIn = false
        })
  }
  cerrar(){
    this.autorizacionService.logout()
  }

  ngOnInit():void{
    if(this.swUpdate.isEnabled){
      this.swUpdate.available.subscribe( (v) =>{
        if (confirm('Actualización disponible, deseas obtenerla?')) {
        window.location.reload();
      }
      })
  }}
}
