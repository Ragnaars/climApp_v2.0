import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CiudadesPageRoutingModule } from './ciudades-routing.module';

import { CiudadesPage } from './ciudades.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CiudadesPageRoutingModule
  ],
  declarations: [CiudadesPage]
})
export class CiudadesPageModule {}
