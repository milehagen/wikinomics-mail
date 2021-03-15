import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent, AboutUsNorwegianComponent } from './aboutus/aboutus.component';
import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { HomeComponent, HomeNorwegianComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UnsubscribeComponent } from './unsubscribe/unsubscribe.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeNorwegianComponent
  },
  {
    path: 'home/en',
    component: HomeComponent
  },
  {
    path: 'aboutus',
    component: AboutUsNorwegianComponent
  },
  {
    path: 'aboutus/en',
    component: AboutUsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'unsubscribe',
    component: UnsubscribeComponent,
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
