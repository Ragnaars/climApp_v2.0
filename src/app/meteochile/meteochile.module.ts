import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeteochilePageRoutingModule } from './meteochile-routing.module';

import { MeteochilePage } from './meteochile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeteochilePageRoutingModule
  ],
  declarations: [MeteochilePage]
})
export class MeteochilePageModule {}
