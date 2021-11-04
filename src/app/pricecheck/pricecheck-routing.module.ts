import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PricecheckPage } from './pricecheck.page';

const routes: Routes = [
  {
    path: '',
    component: PricecheckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PricecheckPageRoutingModule {}
