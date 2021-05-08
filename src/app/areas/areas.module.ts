import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AreasPageRoutingModule } from './areas-routing.module';

import { AreasPage } from './areas.page';
import { AddareaComponent } from './addarea/addarea.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AreasPageRoutingModule
  ],
  declarations: [AreasPage, AddareaComponent]
})
export class AreasPageModule {}
