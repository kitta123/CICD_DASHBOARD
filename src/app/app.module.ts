import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FullComponent } from './full/full.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { RedirectComponent } from './redirect/redirect.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PrivateComponent } from './modules/private/private.component';
import { NightlyComponent } from './modules/nightly/nightly.component';
import { TestUiComponent } from './modules/test-ui/test-ui.component';
import { JobconfigComponent } from './modules/jobconfig/jobconfig.component';


@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    RedirectComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    PrivateComponent,
    TestUiComponent,
    NightlyComponent,
    JobconfigComponent
  ],
  imports: [
    BrowserModule, 
    ReactiveFormsModule,
    AppRoutingModule,
    CommonModule,
    NgMultiSelectDropDownModule.forRoot(),
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng4LoadingSpinnerModule.forRoot(),
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
