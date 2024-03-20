import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CondicionCiudadPage } from './condicion-ciudad.page';

const routes: Routes = [
  {
    path: '',
    component: CondicionCiudadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CondicionCiudadPageRoutingModule {}
