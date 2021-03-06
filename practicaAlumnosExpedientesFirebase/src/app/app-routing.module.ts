import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'editar-alumno',
    loadChildren: () => import('./editar-alumno/editar-alumno.module').then( m => m.EditarAlumnoPageModule)
  },
  {
    path: 'ver-expediente',
    loadChildren: () => import('./ver-expediente/ver-expediente.module').then( m => m.VerExpedientePageModule)
  },
  {
    path: 'nuevo-espediente',
    loadChildren: () => import('./nuevo-espediente/nuevo-espediente.module').then( m => m.NuevoEspedientePageModule)
  },
  {
    path: 'ver-documento',
    loadChildren: () => import('./ver-documento/ver-documento.module').then( m => m.VerDocumentoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
