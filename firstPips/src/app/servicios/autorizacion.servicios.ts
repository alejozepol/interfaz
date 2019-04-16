import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable()

export class AutorizacionSericios{
  constructor(
    //afDB  objeto para conexion con base de datos de firebase
    private afDB: AngularFireDatabase,
    // angularFireAuth objeto para autenticacion con las opciones de firebase
    private angularFireAuth: AngularFireAuth,
    private router:Router){
      this.islogged()
  }
  public login = (email, clave) =>{
    this.angularFireAuth.auth.signInWithEmailAndPassword(email, clave)
                      .then((respuesta)=>{
                        alert('Usuario logueado')
                        this.router.navigate(['deshboard'])
                      })
                    .catch((error)=>{
                      alert('un error a ocurrido')
                      console.log(error)
                    })
  }

  public logout(){
    // metodo para logueo con usuario y contraseña
    return this.angularFireAuth.auth.signOut()
              .then(()=>{
                this.router.navigate(['logueo'])
              });
  }

  public registro = (email , clave) =>{

    this.angularFireAuth.auth.createUserWithEmailAndPassword(email, clave)
                      .then((respuesta)=>{
                        alert('Usuario registrado con exito')
                        this.router.navigate(['deshboard'])

                      })
                    .catch((error)=>{
                      alert('un error a ocurrido')
                      console.log(error)
                    })
                  }

  public islogged(){
    return this.angularFireAuth.authState;

  }

  public getUsuario(){
    return this.angularFireAuth.auth
  }

  loginFacebook(){
    //metodo de logueo con facebook utilizando un popup para ingreso a la red social y devolverse a la pagina de la aplicacion
      this.angularFireAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
          .then((resultado)=>{
            console.log(resultado)
              alert('Usuario logueado con facebook')
              this.router.navigate(['deshboard'])
          })
          .catch((error)=>{
            console.log(error)
          })
  }

  loginGoogle(){
    this.angularFireAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider())
      .then((resultado)=>{
        console.log(resultado)
          alert('Usuario logueado con Google')

      })
      .catch((error)=>{
        console.log(error)
      })
  }
}
