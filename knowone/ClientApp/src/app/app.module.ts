import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from  './navbar/navbar.component';
import { HomeComponent, HomeNorwegianComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { MailModal } from './admin/modal/mailModal';
import { LoginComponent } from './login/login.component';
import { RightsComponent } from './rights/rights.component';
import { AppRoutingModule } from './app-routing.module';
import { UnsubscribeComponent } from './unsubscribe/unsubscribe.component';
import { AboutUsComponent, AboutUsNorwegianComponent } from './aboutus/aboutus.component';
import { SignedUpComponent, SignedUpNorwegianComponent } from './home/signedUp';
import { SignUpComponent, SignUpNorwegianComponent } from './home/signUp.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        HomeNorwegianComponent,
        AboutUsComponent,
        AboutUsNorwegianComponent,
        AdminComponent,
        MailModal,
        LoginComponent,
        RightsComponent,
        UnsubscribeComponent,
        SignedUpComponent,
        SignedUpNorwegianComponent,
        SignUpComponent,
        SignUpNorwegianComponent
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NgbModule,
    ],
    providers: [],
    bootstrap: [AppComponent, NavbarComponent, RightsComponent]
})
export class AppModule { }
