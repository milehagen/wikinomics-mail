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
    component: HomeComponent
  },
  {
    path: 'home/no',
    component: HomeNorwegianComponent
  },
  {
    path: 'aboutus',
    component: AboutUsComponent
  },
  {
    path: 'aboutus/no',
    component: AboutUsNorwegianComponent
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
