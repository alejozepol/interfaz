import { Component } from '@angular/core';
import { AutorizacionSericios } from './servicios/autorizacion.servicios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'firstPips';
  loginP : any ={}
  loggedIn =false;
  usuario: any = null
  constructor( private autorizacionService: AutorizacionSericios) {
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

   login(){
        this.autorizacionService.login(  this.loginP.email,this.loginP.clave)
   }

   facebookLogin(){
     this.autorizacionService.loginFacebook()
   }

   googleLogin(){
    this.autorizacionService.loginGoogle()
  }

   cerrar(){
     this.autorizacionService.logout()
   }
}
