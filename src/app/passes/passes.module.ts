import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PassesPageRoutingModule } from './passes-routing.module';

import { PassesPage } from './passes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PassesPageRoutingModule
  ],
  declarations: [PassesPage]
})
export class PassesPageModule {}
