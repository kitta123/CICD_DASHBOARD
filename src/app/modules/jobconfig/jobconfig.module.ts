import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobconfigRoutingModule } from './jobconfig-routing.module';
import { JobconfigComponent } from './jobconfig.component';


@NgModule({
  declarations: [JobconfigComponent],
  imports: [
    CommonModule,
    JobconfigRoutingModule
  ]
})
export class JobconfigModule { }
