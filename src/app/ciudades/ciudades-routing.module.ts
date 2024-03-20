import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CiudadesPage } from './ciudades.page';

const routes: Routes = [
  {
    path: '',
    component: CiudadesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CiudadesPageRoutingModule {}
