import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardsPageRoutingModule } from './cards-routing.module';

import { CardsPage } from './cards.page';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardsPageRoutingModule,
    NgxQRCodeModule
  ],
  declarations: [CardsPage]
})
export class CardsPageModule {}
