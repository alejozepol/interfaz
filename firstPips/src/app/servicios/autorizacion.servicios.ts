import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import swal from'sweetalert';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()

export class AutorizacionSericios{
//inicio de declaracion de atributos de la clase
  usuarios={}
  Configuracion = {url: 'http://localhost:4200'}
  usuario = {}
//fin de declaracion de atributos de la clase

constructor(//afDB  objeto para conexion con base de datos de firebase
                private afDB: AngularFirestore,
            // angularFireAuth objeto para autenticacion con las opciones de firebase
                private angularFireAuth: AngularFireAuth,
            // Router para redireccionamiento de paginas
                private router:Router)
          {this.islogged()}


//inicio Creacion de usuario por email y contraseña
public crearCuentaEmailClave = (usuario) =>{
/*   metodo @createUserWithEmailAndPassword: crea el usuario en firebase con los
  @param email del usuario y la @param clave
*/
  this.angularFireAuth.auth.createUserWithEmailAndPassword(usuario.email, usuario.clave)
  /* Una promesa que se recibe con el @metodo then*/
        .then((respuesta)=>{
          /* con el atributo del objeto @user informacion del usuario en la informacion
          del modulo de autenticacion de firebase y con @param updateProfile se modifica
          la informacion del usuario */
          respuesta.user.updateProfile({
            displayName: usuario.nombres
          })
          /* @metodo sendEmailVerification se envia el correo y se configura la
          URL como @param this.Configuracion del boton del link de verificacion */
          respuesta.user.sendEmailVerification(this.Configuracion)
                        .catch(error => {
                          console.log(error)
                          /* Mensaje de error si hay un error en el envio del correo
                          de verificación */
                          swal({
                            title: "Error envio de correo",
                            text: `se presento el siguiente error al momento de
                                  intentar enviar el correo de verificacion: ${error}`,
                            icon: 'error'
                          })
                        })
                        /* Deslogueo despues del regisro */
                        swal({
                              title: `¡Gracias por registrarte y Bienvenido!
                                            🤩 ${usuario.nombres} 🤩`,
                              text: `No olvides realizar el porceso de verificacion desde el enlace enviado a tu ${usuario.email} para poderte loguear despues de ver los siguientes videos`,
                              icon: 'info'
                        })
                        this.angularFireAuth.auth.signOut()
                      })

        .catch((error)=>{
        console.log(error)
        swal({
          title: "Error realizando el registro del usuario",
          text: `se presento el siguiente error al momento de
                intentar registrar el usuario: ${error}`,
          icon: 'error'
        })
      })
  this.afDB.collection('Usuarios')
  /* Registro en la base de datos en la coleccion Usuarios y enviando el objeto
  como coleccion JSON con los atributos recogidos en el formulario de registro*/
  .add({
          nombre          : usuario.nombres,
          apellidos       : usuario.apellidos,
          telefono        : usuario.telefono,
          fechaNacimiento : usuario.fechaNacimiento,
          email           : usuario.email,
          usuarioPremium  : false,
          fechaRegistro   : new Date(),
          fechaPago       : null
  })
  .catch(bderror =>{
    console.log(`se presento el siguiente error al intentar registrar un nuevo
    usuario en la base de datos: ${bderror} `)
  })

}
//Fin Creacion de usuario por email y contraseña

public login(email, clave){
  this.angularFireAuth.auth.signInWithEmailAndPassword(email, clave)
      .then((respuesta)=>{
          if(respuesta.user.emailVerified){
            swal({
              title: `¡Bienvenido 🤩 ${respuesta.user.displayName}🤩!`,
              text: `estamos muy feliz de que estes aqui`,
              icon: 'info'
        })
            this.router.navigate(['deshboard'])
          }else{
            this.angularFireAuth.auth.signOut()
            this.router.navigate(['logueo'])
            swal({
              title: `¡Lo sentimos
              😰${respuesta.user.displayName}😰!`,
              text: `Para poder ingresar primero debes verificar tu correo electronico ${respuesta.user.email} donde encontraras un enlace para activar tu cuenta `,
              icon: 'warning'
        })}
      })
      .catch((error)=>{
            if(error.code ==="auth/wrong-password"){
              swal({
                title: `😰¡Clave Errada!😰`,
                text: `por favor intenta nuevamente `,
                icon: 'error'
          })}
            else if(error.code ==="auth/user-not-found"){
              swal({
                title: `😰¡Usuario no encontrado!😰`,
                text: `Por favor intenta verifica de intenta de nuevo. Si no estas registrado nos gustaria mucho tenerte en nuestra app
                ¡Registrate! `,
                icon: 'warning'
          })
            }
            else{
              alert('un error a ocurrido')
              console.log(error)
            }

                    })
  }

  public logout(){
    // metodo para logueo con usuario y contraseña
    return this.angularFireAuth.auth.signOut()
              .then(()=>{
                this.router.navigate(['logueo'])
              });
  }




  public islogged(){
    return this.angularFireAuth.authState;

  }

  public datosUsuario(){

    return this.angularFireAuth.auth
  }



  loginFacebook(){
    //metodo de logueo con facebook utilizando un popup para ingreso a la red social y devolverse a la pagina de la aplicacion
      this.angularFireAuth.auth.signInWithPopup(
        new firebase.auth.FacebookAuthProvider())
          .then((resultado)=>{
             this.usuario = resultado.user
            swal({
              title: `¡Bienvenido 🤩 ${resultado.user.displayName}🤩!`,
              text: `estamos muy feliz de que estes aqui`,
              icon: 'info'
        })
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
        this.usuario = resultado.user.email
        this.router.navigate(['deshboard'])
        swal({
          title: `¡Bienvenido 🤩${resultado.user.displayName}🤩!`,
          text: `estamos muy feliz de que estes aqui`,
          icon: 'info'
    })


      })
      .catch((error)=>{
        console.log(error)
      })
  }
}
