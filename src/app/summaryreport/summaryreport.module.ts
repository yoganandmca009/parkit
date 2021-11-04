import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SummaryreportPageRoutingModule } from './summaryreport-routing.module';

import { SummaryreportPage } from './summaryreport.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SummaryreportPageRoutingModule
  ],
  declarations: [SummaryreportPage]
})
export class SummaryreportPageModule {}
