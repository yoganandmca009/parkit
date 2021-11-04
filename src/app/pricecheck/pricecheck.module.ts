import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PricecheckPageRoutingModule } from './pricecheck-routing.module';

import { PricecheckPage } from './pricecheck.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PricecheckPageRoutingModule
  ],
  declarations: [PricecheckPage]
})
export class PricecheckPageModule {}
