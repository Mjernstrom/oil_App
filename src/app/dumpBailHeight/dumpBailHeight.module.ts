import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { dumpBailHeightPageRoutingModule } from './dumpBailHeight-routing.module';
import { dumpBailHeight } from './dumpBailHeight.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    dumpBailHeightPageRoutingModule
  ],
  declarations: [dumpBailHeight]
})
export class dumpBailHeightPageModule {}
