import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CondicionActualPage } from './condicion-actual.page';

const routes: Routes = [
  {
    path: '',
    component: CondicionActualPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CondicionActualPageRoutingModule {}
