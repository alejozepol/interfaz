import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutorizacionSericios } from './servicios/autorizacion.servicios';


import {AngularFireModule} from "@angular/fire"
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { DeshboardComponentes } from './deshboard/deshboard.componentes';
import { LogueoComponent } from './logueo/logueo.component';
import { RegistroComponent } from './registro/registro.component';
import { GuardianServicios } from './servicios/guardian.servicios';

//material design
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
  MatStepperPrevious,
  MatStepperNext} from '@angular/material';
import { A11yModule } from '@angular/cdk/a11y';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SenalesServicios } from './servicios/senales.servicios';
import { CrearComponent } from './crear/crear.component';
import { DetalleSenalComponent } from './detalleSenal/detalleSenal.component';

const  firebaseConfig = {
  apiKey: "AIzaSyDCuSSpHi3L9PSbLnCOGid3zuQLqSSwNj0",
  authDomain: "fistpips.firebaseapp.com",
  databaseURL: "https://fistpips.firebaseio.com",
  projectId: "fistpips",
  storageBucket: "fistpips.appspot.com",
  messagingSenderId: "823849314972"
}

  const appRoutes: Routes =[
    {path:'', component: AppComponent, canActivate:[GuardianServicios]},
    {path:'deshboard', component: DeshboardComponentes, canActivate:[GuardianServicios]},
    {path:'logueo', component: LogueoComponent},
    {path:'registro', component: RegistroComponent},
    {path:'crear/:id', component: CrearComponent, canActivate:[GuardianServicios]},
  ]

@NgModule({
  declarations: [
    AppComponent,
    DeshboardComponentes,
    LogueoComponent,
    RegistroComponent,
    CrearComponent,
    DetalleSenalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AngularFireDatabaseModule,
        // import HttpClientModule after BrowserModule.
    FormsModule,

    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })

  ],
  providers: [AutorizacionSericios,
              GuardianServicios,
              SenalesServicios,
              RegistroComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
