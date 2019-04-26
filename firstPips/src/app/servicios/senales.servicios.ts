import { Injectable } from '@angular/core';
import { AutorizacionSericios } from './autorizacion.servicios';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()

export class SenalesServicios{
  user = this.autorizacionServicios.datosUsuario()
  senal : any = {}
  constructor(private afDB:AngularFirestore, private autorizacionServicios : AutorizacionSericios){

  }


  guardarSenal(senal){
    return this.afDB.collection('Senales')
    .add(senal);
  }

  getSenal(id){
    return this.afDB.collection('Senales', ref => ref.where("id","==",1556166188368))
   }



  getSenales(){
    return this.afDB.collection('Senales')
  }

  editarsenal(id){
    this.afDB.collection('Senales').ref
    .where('id','==', id)

  }


}
