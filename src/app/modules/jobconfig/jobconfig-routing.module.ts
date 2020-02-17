import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobconfigComponent } from './jobconfig.component';

const routes: Routes = [
  { path: '',
  component: JobconfigComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobconfigRoutingModule { }
