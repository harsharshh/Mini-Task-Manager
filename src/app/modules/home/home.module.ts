import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {ThemeModule} from '../../@theme/theme.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HOME_ROUTES} from './home.route';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    RouterModule.forChild(HOME_ROUTES),
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ThemeModule
  ]
})
export class HomeModule { }
