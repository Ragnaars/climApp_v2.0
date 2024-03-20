import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CondicionCiudadPageRoutingModule } from './condicion-ciudad-routing.module';

import { CondicionCiudadPage } from './condicion-ciudad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CondicionCiudadPageRoutingModule
  ],
  declarations: [CondicionCiudadPage]
})
export class CondicionCiudadPageModule {}
