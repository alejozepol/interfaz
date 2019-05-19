import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import swal from'sweetalert';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()

export class AutorizacionSericios{
//inicio de declaracion de atributos de la clase
  usuarios      ={}
  Configuracion = {url: 'https://fistpips.firebaseapp.com/'}
  usuario: any  = {}
//fin de declaracion de atributos de la clase

constructor(//afDB  objeto para conexion con base de datos de firebase
                private afDB: AngularFirestore,
            // angularFireAuth objeto para autenticacion con las opciones de firebase
                private angularFireAuth: AngularFireAuth,
            // Router para redireccionamiento de paginas
                private router:Router,
                private mensajes:MatSnackBar)
          {this.islogged()
          }



/*===============================>De logueo<================================================*/
      /*---------------------Inicio por Correo----------------------------------------------*/
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
          this.usuario.email             = usuario.email
          this.usuario.fechaNacimiento   = usuario.fechaNacimiento
          this.usuario.uid               = respuesta.user.uid
          this.usuario.telefono          = usuario.telefono
          this.usuario.nombres           = usuario.nombres
          this.usuario.apellidos         = usuario.apellidos
          this.usuario.admin             = false
          this.usuario.usuarioPremium    = false
          this.usuario.fechaRegistro     = new Date()
          this.creacionUsuarioBD(this.usuario)
          /* @metodo sendEmailVerification se envia el correo y se configura la
          URL como @param this.Configuracion del boton del link de verificacion */
          respuesta.user.sendEmailVerification(this.Configuracion)
                    .then(()=>{

                    })
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
                      this.logout()
                    })

                    /* Deslogueo despues del regisro */
                    swal({
                          title: `¡Gracias por registrarte y Bienvenido!
                                        🤩 ${usuario.nombres} 🤩`,
                          text: `No olvides realizar el porceso de verificacion desde el enlace enviado a tu ${usuario.email} para poderte loguear despues de ver los siguientes videos`,
                          icon: 'info'
                    })
                  })
      .catch((error)=>{
        if(error.code ==="auth/email-already-in-use"){
          swal({
            title: `⚠¡Correo ya registrado!😰`,
            text: ` ¿Quieres restaurar la clave para el ${usuario.email} ?`,
            icon: 'error',
            content: {
              element: "button",
              attributes: {
                textContent: "Restaurar Contraseña",
                type: "button",
                className:"btn btn-warning",
                onclick: this.restablecerClave(usuario.email)
              }
          }})}
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
        }})
        this.logout()
//Fin Creacion de usuario por email y contraseña
}

public login(email, clave){
  this.angularFireAuth.auth.signInWithEmailAndPassword(email, clave)
      .then((respuesta)=>{
          if(respuesta.user.emailVerified){
            this.usuario.uid = respuesta.user.uid
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
//Fin Logeo por email y contraseña
}

public restablecerClave(email){
  this.angularFireAuth.auth
                          .sendPasswordResetEmail(email)
                          .then()
                          .catch((error)=> {this.mensajes.open('correo enviado para recuperacion de contraseña','Enviado',{duration:2000})})
}
      /*---------------------Fin por Correo---------------------------------------------------*/
      /*---------------------Inicio por Redes Sociales----------------------------------------*/
public loginFacebook(){
    //metodo de logueo con facebook utilizando un popup para ingreso a la red social y devolverse a la pagina de la aplicacion
      this.angularFireAuth.auth.signInWithPopup(
        new firebase.auth.FacebookAuthProvider())
          .then((resultado)=>{
            this.usuario.email             = resultado.user.email
            this.usuario.uid               = resultado.user.uid
            this.usuario.telefono          = resultado.user.phoneNumber
            this.usuario.nombresApellidos  = resultado.user.displayName
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
//Fin Logeo Facebook
}

public loginGoogle(){
  this.angularFireAuth.auth.signInWithPopup(
    new firebase.auth.GoogleAuthProvider())
    .then((resultado)=>{
console.log(resultado)
      this.usuario.email             = resultado.user.email
      this.usuario.uid               = resultado.user.uid
      this.usuario.nombresApellidos  = resultado.user.displayName
      this.usuario.UrlPhoto          = resultado.user.photoURL
      resultado.user.updateProfile({
        displayName: this.usuario.nombresApellidos,
        photoURL : this.usuario.UrlPhoto

      })
      this.datosUsuariosBD(this.usuario.email)
      .subscribe( usuario =>{
        console.log(usuario)
        var usu = usuario
        if(usu === undefined){
          this.usuario.admin             = false
          this.usuario.usuarioPremium    = false
          this.usuario.fechaRegistro     = new Date()
          this.creacionUsuarioBD(this.usuario)
          swal({
            title: `¡Bienvenido  🤩${resultado.user.displayName}🤩!`,
            text: `Gracias por registrarte. Vuelve a iniciar sesion`,
            icon: 'Warning'
        })
        this.logout()
        this.router.navigate(['logueo'])

      } else{
        this.usuario.UrlPhoto          = resultado.user.photoURL
        this.modificarUsuarioBD(this.usuario)
        swal({
          title: `¡Bienvenido 🤩${resultado.user.displayName}🤩!`,
          text: `estamos muy feliz de que estes aqui`,
          icon: 'info' })
          this.router.navigate(['deshboard'])
        }

      })

      })
    .catch((error)=>{
      console.log(error)
    })
//Fin Logeo Google
}

        /*---------------------Fin por Redes Sociales----------------------------------------*/
        /*---------------------Inicio Generales ----------------------------------------*/
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
        /*---------------------Fin Generales ----------------------------------------*/
/*===============================>De consulta<================================================*/
  public datosUsuariosBD(email){
    var query = this.afDB.collection("Usuarios").doc(email)
    .valueChanges()
    return query
  }
  public datosUsuario(){
    return this.angularFireAuth.auth.currentUser
  }


  public creacionUsuarioBD(usuario){
    this.afDB.collection('Usuarios').doc(usuario.email)
    /* Registro en la base de datos en la coleccion Usuarios y enviando el objeto
    como coleccion JSON con los atributos recogidos en el formulario de registro*/
    .set(usuario)
    .catch(bderror =>{
      console.log(`se presento el siguiente error al intentar registrar un nuevo
      usuario en la base de datos: ${bderror} `)
    })
  }

  public modificarUsuarioBD(usuario){
    this.afDB.collection('Usuarios').doc(usuario.email)
    .update(usuario)
    .catch(bderror =>{
      console.log(`se presento el siguiente error al intentar registrar un nuevo
      usuario en la base de datos: ${bderror} `)
    })
  }

}
