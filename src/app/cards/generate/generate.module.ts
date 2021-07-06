import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneratePageRoutingModule } from './generate-routing.module';

import { GeneratePage } from './generate.page';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeneratePageRoutingModule,
    NgxQRCodeModule
  ],
  declarations: [GeneratePage]
})
export class GeneratePageModule {}
