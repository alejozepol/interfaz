import { Injectable } from "@angular/core";
import { CanActivate, Router } from '@angular/router';
import { AutorizacionSericios } from './autorizacion.servicios';
import { RegistroComponent } from '../registro/registro.component';

@Injectable()

export class GuardianServicios implements CanActivate{

  loggedIn =false

constructor(private autorizacionServios: AutorizacionSericios,
  private router:Router, private registro: RegistroComponent){
    this.autorizacionServios.islogged()
    .subscribe((resultado)=>{
      if(this.registro.paso ===3){
        this.loggedIn =false
      }



      if  (resultado && resultado.uid){
          this.loggedIn =true
          this.router.navigate(['deshboard'])
      }
      else{
        this.loggedIn =false
        this.router.navigate(['logueo'])
      }
    }, (error) =>{
      this.loggedIn =false
    })

}

canActivate(){
return this.loggedIn
}
}
