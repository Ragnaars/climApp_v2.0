import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeteochilePage } from './meteochile.page';

const routes: Routes = [
  {
    path: '',
    component: MeteochilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeteochilePageRoutingModule {}
