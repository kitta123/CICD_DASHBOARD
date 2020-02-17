import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestUiRoutingModule } from './test-ui-routing.module';
import { TestUiComponent } from './test-ui.component';
import { NewTestComponent } from './new-test/new-test.component';
import { EditTestComponent } from './edit-test/edit-test.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [TestUiComponent, NewTestComponent, EditTestComponent],
  imports: [
    CommonModule,
    TestUiRoutingModule,
    RouterModule
  ],
  exports: [
    TestUiComponent, 
    NewTestComponent, 
    EditTestComponent   
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class TestUiModule { }
