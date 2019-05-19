import { Component, OnInit } from '@angular/core';
import { AutorizacionSericios } from './servicios/autorizacion.servicios';
import { SwUpdate } from '@angular/service-worker';
import { FacebookService, InitParams } from 'ngx-facebook';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'firstPips';
  loggedIn =false;
  usuario: any = {}
  usuarios : any = {}

  constructor(  private autorizacionService: AutorizacionSericios,
                private swUpdate: SwUpdate,
                private facebookService: FacebookService){

      this.autorizacionService.islogged()
        .subscribe((resultado)=>{
          if  (resultado && resultado.uid){

              this.loggedIn = true
             setTimeout(()=>{
                this.usuario.email = this.autorizacionService.datosUsuario().email
                this.usuario.avatar = this.autorizacionService.datosUsuario().photoURL
              },500)
          }
          else{

            this.loggedIn = false
          }
        }, (error) =>{
          console.log(error)
          this.loggedIn = false
        })
  }
  cerrar(){
    this.autorizacionService.logout()
  }

  private initFacebookService(): void {
    const initParams: InitParams = {xfbml:true, version:'v3.2'};
    this.facebookService.init(initParams);
  }
  ngOnInit():void{
    if(this.swUpdate.isEnabled){
      this.swUpdate.available.subscribe( (v) =>{
        if (confirm('Actualización disponible, deseas obtenerla?')) {
        window.location.reload();
      }
      })
  }
  this.initFacebookService();
}
}
