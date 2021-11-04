import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehnoreportPage } from './vehnoreport.page';

const routes: Routes = [
  {
    path: '',
    component: VehnoreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehnoreportPageRoutingModule {}
