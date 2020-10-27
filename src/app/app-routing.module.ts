import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppPageComponent} from './@theme/layouts/app-page/app-page.component';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AppPageComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
