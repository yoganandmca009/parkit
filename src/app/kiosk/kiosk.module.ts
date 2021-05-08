import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KioskPageRoutingModule } from './kiosk-routing.module';

import { KioskPage } from './kiosk.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KioskPageRoutingModule
  ],
  declarations: [KioskPage]
})
export class KioskPageModule {}
