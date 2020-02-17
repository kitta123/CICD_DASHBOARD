import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NightlyRoutingModule } from './nightly-routing.module';
import { NightlyComponent } from './nightly.component';


@NgModule({
  declarations: [NightlyComponent],
  imports: [
    CommonModule,
    NightlyRoutingModule
  ]
})
export class NightlyModule { }
