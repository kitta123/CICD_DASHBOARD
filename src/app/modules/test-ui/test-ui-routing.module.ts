import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TestUiComponent } from './test-ui.component';
import { NewTestComponent } from './new-test/new-test.component';
import { EditTestComponent } from './edit-test/edit-test.component';

const routes: Routes = [

      {path: '', component: NewTestComponent },
      {path: 'edittest', component: EditTestComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestUiRoutingModule { }
