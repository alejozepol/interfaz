import { Injectable } from '@angular/core';
import { AutorizacionSericios } from './autorizacion.servicios';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()

export class SenalesServicios{
  user = this.autorizacionServicios.datosUsuario()
  senal : any = {}
  doc : any
  constructor(private afDB:AngularFirestore, private autorizacionServicios : AutorizacionSericios){

  }

  suscripcion(estado, sid, uid){
    var usuarioSenal: any={}
    usuarioSenal.uid = sid
    usuarioSenal.sid = uid
    if(!estado){

      this.GuardarSuscripcionSenal(usuarioSenal)
    }
    else{
      this.ConsultarDocumentoSuscripcionSenal(usuarioSenal.uid, usuarioSenal.sid)
      .subscribe( resultado =>{
                  console.log(resultado)
                  this.EliminarSuscripcionSenal(resultado)
      })

    }

  }

  GuardarSuscripcionSenal(usuarioSenal){
    return this.afDB.collection("usuarioSenal")
                    .add(usuarioSenal)
  }

  ConsultarDatosSuscripcionSenal(uid, sid){
    return this.afDB.collection("usuarioSenal",
                                ref => ref
                                .where("uid","==",uid)
                                .where("sid","==",sid) ).valueChanges()
  }

  ConsultarDocumentoSuscripcionSenal(uid, sid){
    return this.afDB.collection("usuarioSenal",
                                ref => ref
                                .where("uid","==",uid)
                                .where("sid","==",sid) ).snapshotChanges()
  }

  EliminarSuscripcionSenal(doc){
    return this.afDB.doc(doc).delete()
  }

  guardarSenal(senal){
    return this.afDB.collection('Senales')
    .add(senal);
  }

  getSenal(id){
    var query = this.afDB.collection("Senales", ref => ref.where("id","==",id)).valueChanges()
    return query
   }

   consultaSenalCampoValor(campo,valor){
    var query = this.afDB.collection("Senales", ref => ref.where(campo,"==",valor)).valueChanges()
    return query
   }

   consultaSenalCampoValorActivas(campo,valor){
    var query = this.afDB.collection("Senales", ref => ref.where(campo,"==",valor).where('estado',"==",true)).valueChanges()
    return query
   }

  getSenales(){
    return this.afDB.collection('Senales')
  }

  getSenalesActivas(){
    return this.afDB.collection('Senales', ref => ref.where('estado',"==",true))
  }

  getSenalesInactivas(){
    return this.afDB.collection('Senales', ref => ref.where('estado',"==",false))
  }
  editarsenal(id, senal){
    this.afDB.collection("Senales", ref => ref.where("id","==",id)).stateChanges()
    .subscribe(doc => {
       this.doc = doc[0].payload.doc.id
      console.log(senal)
      console.log(this.doc)
      this.afDB.collection('Senales').doc(this.doc).update(senal)
    })
  }
}
