import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardsPage } from './cards.page';

const routes: Routes = [
  {
    path: '',
    component: CardsPage
  },
  {
    path: 'request',
    loadChildren: () => import('./request/request.module').then( m => m.RequestPageModule)
  },
  {
    path: 'generate',
    loadChildren: () => import('./generate/generate.module').then( m => m.GeneratePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardsPageRoutingModule {}
