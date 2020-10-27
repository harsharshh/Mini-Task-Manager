import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  NbAccordionModule,
  NbActionsModule,
  NbAlertModule,
  NbBadgeModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbContextMenuModule,
  NbDatepickerModule,
  NbDialogModule, NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbListModule,
  NbMenuModule,
  NbPopoverModule,
  NbRadioModule,
  NbRouteTabsetModule,
  NbSearchModule,
  NbSelectModule,
  NbSidebarModule,
  NbSpinnerModule,
  NbStepperModule,
  NbTabsetModule,
  NbThemeModule,
  NbToastrModule,
  NbTooltipModule,
  NbUserModule,
  NbWindowModule
} from '@nebular/theme';

import {NbEvaIconsModule} from '@nebular/eva-icons';
import {NbSecurityModule} from '@nebular/security';


import {
  OneColumnLayoutComponent,
} from './layouts';
import {AppPageComponent} from './layouts/app-page/app-page.component';
import {RouterModule} from '@angular/router';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxDropzoneModule} from 'ngx-dropzone';

const NB_MODULES = [
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbContextMenuModule,
  NbSecurityModule,
  NbButtonModule,
  NbSelectModule,
  NbSpinnerModule,
  NbToastrModule,
  NbActionsModule,
  NbAccordionModule,
  NbAlertModule,
  NbBadgeModule,
  NbCardModule,
  NbCheckboxModule,
  NbDialogModule,
  NbLayoutModule,
  NbMenuModule,
  NbPopoverModule,
  NbRouteTabsetModule,
  NbSelectModule,
  NbSidebarModule,
  NbTabsetModule,
  NbUserModule,
  NbButtonModule,
  NbListModule,
  NbContextMenuModule,
  NbRadioModule,
  NbTooltipModule,
  NbInputModule,
  NbWindowModule,
  NbStepperModule,
  NbIconModule,
  NbEvaIconsModule,
  NbThemeModule,
  NbDatepickerModule,
  NbFormFieldModule
];
const NEBULAR_FOR_ROOT = [
  NbSidebarModule,
  NbMenuModule,
  NbDatepickerModule,
  NbDialogModule,
  NbWindowModule,
  NbToastrModule,
];

const COMPONENTS = [
  AppPageComponent,
  OneColumnLayoutComponent
];
const PIPES = [];

const COMMON__MODULES = [
  ReactiveFormsModule,
  FormsModule];

const THIRD_PARTY = [
  Ng2SmartTableModule,
  NgbModule,
  NgxDropzoneModule
];

@NgModule({
  imports: [CommonModule, ...NB_MODULES, RouterModule, ...NEBULAR_FOR_ROOT, ...THIRD_PARTY, ...COMMON__MODULES],
  exports: [CommonModule, ...PIPES, ...COMPONENTS, ...NB_MODULES, ...THIRD_PARTY, ...COMMON__MODULES, ...NEBULAR_FOR_ROOT],
  declarations: [...COMPONENTS, ...PIPES],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders<ThemeModule> {
    return {
      ngModule: ThemeModule,
      providers: [
        ...NbThemeModule.forRoot(
          {
            name: 'corporate',
          },
        ).providers,
      ],
    };
  }
}
