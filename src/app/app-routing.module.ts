import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullComponent } from './full/full.component';
import { RedirectComponent } from './redirect/redirect.component';
import { PrivateComponent } from './modules/private/private.component';
import { NightlyComponent } from './modules/nightly/nightly.component';
// import { DashboardComponent } from './modules/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    children: [{
      path: '',
      loadChildren: './authentication/authentication.module#AuthenticationModule'
    }]
  },
  {
    path: '',
    component: FullComponent,
    children: [
      // { path: 'private', component: PrivateComponent },
      { path: 'private/image/:userId', component: PrivateComponent },
      // { path: 'night', component: NightlyComponent },
      { path: 'night/image/:userId', component: NightlyComponent },
      { path: 'dashboard', loadChildren: './modules/dashboard/dashboard.module#DashboardModule' },
      { path: 'jobConfig', loadChildren: './modules/jobconfig/jobconfig.module#JobconfigModule' },
      { path: 'testui', loadChildren: './modules/test-ui/test-ui.module#TestUiModule' },
      { path: 'redirect', component: RedirectComponent }
    ]
  },
  // { path: 'dashboard', component: DashboardComponent },
  // { path: 'night', component: NightComponent },
  // { path: 'buildone/:userId', component: BuildoneComponent },
  // { path: 'private/image/:userId', component: BuildtwoComponent },
  // { path: 'private/', component: PrivateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
