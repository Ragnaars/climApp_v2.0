import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'condicion-actual',
    pathMatch: 'full'
  },
  {
    path: 'condicion-actual',
    loadChildren: () => import('./condicion-actual/condicion-actual.module').then( m => m.CondicionActualPageModule)
  },
  {
    path: 'ciudades',
    loadChildren: () => import('./ciudades/ciudades.module').then( m => m.CiudadesPageModule)
  },
  {
    path: 'condicion-ciudad/:codigo',
    loadChildren: () => import('./condicion-ciudad/condicion-ciudad.module').then( m => m.CondicionCiudadPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
