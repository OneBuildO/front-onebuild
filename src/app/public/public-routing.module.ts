import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { HomeComponent } from './home/home.component';
import { LoginComponent} from './auth/login/login.component';

const routes: Routes = [

  {
    path: '',
    title: 'Login',
    component: LoginComponent,
  },
  // {
  //   path: '',
  //   loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
