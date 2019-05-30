import { Component, OnInit } from '@angular/core';
import { AutorizacionSericios } from './servicios/autorizacion.servicios';
import { SwUpdate } from '@angular/service-worker';
import { FacebookService, InitParams } from 'ngx-facebook';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { MatSnackBar } from '@angular/material';
import { mergeMapTo, mergeMap } from 'rxjs/operators';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Undervisa App';
  loggedIn =false;
  usuario: any = {}
  usuarios : any = {}

  constructor(  private autorizacionService: AutorizacionSericios,
                private swUpdate: SwUpdate,
                private afMessaging:AngularFireMessaging,
                private snackBar: MatSnackBar,
                private facebookService: FacebookService){

      this.autorizacionService.islogged()
        .subscribe((resultado)=>{
          if  (resultado && resultado.uid){

              this.loggedIn = true
              this.usuario.uid = resultado.uid
              this.usuario.email = resultado.email
              this.requestPermission()
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

        console.log(v)
        if (confirm('Tenemos una actualización disponible, ¿deseas obtenerla?')) {
        window.location.reload();
      }
      })
  }

  this.initFacebookService();
}

requestPermission() {
  this.afMessaging.requestToken
    .subscribe(
      (token) => { console.log('Permiso de notificacion guardado', token);
      this.guardarToken(token, this.usuario.email)
    },
      (error) => { console.error(error); },
    );
}

guardarToken(token, email){
  firebase.firestore().collection('tokens')
  .doc(email)
  .set({
    token: token,
    email: email
  })
  .catch( error => {
    console.error(`Permiso no otorgado => ${error}`)
  })
}

deleteToken() {
  this.afMessaging.getToken
    .pipe(mergeMap(token => this.afMessaging.deleteToken(token)
    ))
    .subscribe((token) => {
      console.log('Deleted!');},);

}

}
