import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ThemeModule} from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  NbDatepickerModule, NbDialogModule, NbMenuModule, NbSidebarModule, NbToastrModule,
  NbWindowModule
} from "@nebular/theme";
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    ThemeModule.forRoot(),
    NgbModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
