import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehnoreportPageRoutingModule } from './vehnoreport-routing.module';

import { VehnoreportPage } from './vehnoreport.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VehnoreportPageRoutingModule,
    NgxDatatableModule
  ],
  declarations: [VehnoreportPage]
})
export class VehnoreportPageModule {}
