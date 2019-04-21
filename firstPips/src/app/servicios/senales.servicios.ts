import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()

export class SenalesServicios{

  constructor(private afDB:AngularFireDatabase){

  }

  guardarSenal(senal){
    return this.afDB.database.ref('senales/'+senal.id).set(senal);
  }

  getSenal(id){
    return this.afDB.object('senales/'+id)
  }

  getSenales(){
    return this.afDB.list('senales')
  }
  editarsenal(senal){
    this.afDB.database.ref('senales/'+senal.id).set(senal);
  }


}
