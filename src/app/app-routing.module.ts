import {
  NgModule
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';

import {
  LoginComponent
} from './features/login/login.component';
import {
  InfoComponent
} from './features/info/info.component';
import {
  HomeComponent
} from './features/home/home.component';
import {
  RegistroComponent
} from './features/registro/registro.component';
import { LoginGuard } from './guards/login.guard';


const routes: Routes = [{
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [LoginGuard]
  },
  {
    path: "info",
    component: InfoComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'registro',
    component: RegistroComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
