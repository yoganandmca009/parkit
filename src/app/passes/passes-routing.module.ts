import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PassesPage } from './passes.page';

const routes: Routes = [
  {
    path: '',
    component: PassesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PassesPageRoutingModule {}
