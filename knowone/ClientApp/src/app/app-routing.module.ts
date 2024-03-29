import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent, AboutUsNorwegianComponent } from './aboutus/aboutus.component';
import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { HomeComponent, HomeNorwegianComponent } from './home/home.component';
import { SignedUpComponent, SignedUpNorwegianComponent } from './home/signedUp';
import { SignUpComponent, SignUpNorwegianComponent } from './home/signUp.component';
import { LoginComponent } from './login/login.component';
import { UnsubscribeComponent } from './unsubscribe/unsubscribe.component';
import { UserReviewsComponent } from './user-reviews/user-reviews.component';


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
    path: 'signedUp',
    component: SignedUpNorwegianComponent,
  },
  {
    path: 'signedUp/en',
    component: SignedUpComponent,
  },
  {
    path: 'signUp',
    component: SignUpNorwegianComponent,
  },
  {
    path: 'signUp/en',
    component: SignUpComponent,
  },
  {
    path: 'reviews',
    component: UserReviewsComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
