import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AutorizacionSericios } from './autorizacion.servicios';

@Injectable()

export class SenalesServicios{

  constructor(private afDB:AngularFirestore, private autorizacionServicios : AutorizacionSericios){

  }
  user = this.autorizacionServicios.datosUsuario()
  guardarSenal(senal){
    return this.afDB.collection('Senales')
    .add(senal);
  }

  getSenal(id){
    return this.afDB
              .collection('Senales')
              .ref
              .where('id','==', id)

  }

  getSenales(){
    return this.afDB.collection('Senales')
  }

  editarsenal(id){
    this.afDB.collection('Senales').ref
    .where('id','==', id)

  }


}
