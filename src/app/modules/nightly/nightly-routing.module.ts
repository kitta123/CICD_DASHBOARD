import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NightlyComponent } from './nightly.component';

const routes: Routes = [
  { path: 'night/image/:userId', component: NightlyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NightlyRoutingModule { }
