import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CondicionActualPageRoutingModule } from './condicion-actual-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CondicionActualPage } from './condicion-actual.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CondicionActualPageRoutingModule
  ],
  declarations: [CondicionActualPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CondicionActualPageModule {}
