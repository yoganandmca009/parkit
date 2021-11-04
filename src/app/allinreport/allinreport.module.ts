import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllinreportPageRoutingModule } from './allinreport-routing.module';

import { AllinreportPage } from './allinreport.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllinreportPageRoutingModule,
    NgxDatatableModule
  ],
  declarations: [AllinreportPage]
})
export class AllinreportPageModule {}
