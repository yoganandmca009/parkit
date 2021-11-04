import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllinreportPage } from './allinreport.page';

const routes: Routes = [
  {
    path: '',
    component: AllinreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllinreportPageRoutingModule {}
