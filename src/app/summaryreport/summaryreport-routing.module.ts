import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SummaryreportPage } from './summaryreport.page';

const routes: Routes = [
  {
    path: '',
    component: SummaryreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SummaryreportPageRoutingModule {}
