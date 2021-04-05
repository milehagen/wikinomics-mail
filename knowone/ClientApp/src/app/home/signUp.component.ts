import { HttpClient } from "@angular/common/http";
import { Component,OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { MailAddress } from "../Models/MailAddress";
import { Statistic } from "../Models/Statistic";

@Component({
    selector: 'app-home',
    templateUrl: './signUpNorwegian.component.html',
    styleUrls: ['./home.component.css' ],
})

export class SignUpNorwegianComponent {
    termsAccepted: boolean;
    public emailInputForm: FormGroup;
    showInfo: boolean;
    showRegister: boolean;
    public email: string;
    public sendUpdates: boolean;
    firstnameVal: boolean;
    lastnameVal: boolean;
    emailVal: boolean;
    emailRegex = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    constructor(private http: HttpClient, private fb: FormBuilder, private titleService: Title, private router: Router) {
        this.emailInputForm = fb.group(this.formValidation);
        this.setTitle("KnowOne - Norsk");
    }

    ngOnInit() {}

    formValidation = {
        formFirstname: [
        '', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(20)])
        ],
        formLastname: [
        '', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(30)])
        ],
        formEmail: [
        '', Validators.compose([Validators.required, Validators.pattern(this.emailRegex)])
        ]
    }

    //Sets title of HTML document
    public setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle);
    }

    //Event listener to the checkbox for subscribing to mailing list
    wantUpdates(event) {
        this.sendUpdates = event.target.checked;
    }

    //Adds email to database
    addEmailToDb() {
        const mailAddress = new MailAddress();
        mailAddress.firstname = this.emailInputForm.controls.formFirstname.value;
        mailAddress.lastname = this.emailInputForm.controls.formLastname.value;
        mailAddress.address = this.emailInputForm.controls.formEmail.value;
        if (this.sendUpdates) {
        mailAddress.sendUpdates = true;
        }
        else {
        mailAddress.sendUpdates = false;
        }

        this.http.post("api/MailAddress/Save", mailAddress)
        .subscribe(retur => {
            window.alert("Registreringen var vellykket");
            this.sendConfirmationNorwegian(mailAddress);
            this.emailInputForm.reset();
            if (this.sendUpdates) {
            this.updateDBStatistics();
            }
            this.router.navigate(['/signedUp'])
        },
            error => console.log(error)
        );
    }

    sendConfirmationNorwegian(mailAddress: MailAddress) {
        this.http.post("api/MailAddress/ConfirmationMailNorwegian", mailAddress)
        .subscribe(respons => {
            console.log(respons);
        });
    }

    updateDBStatistics() {
        var stats = new Statistic();
        stats.lastSignUp = new Date();
        stats.totalSubscribes = 1;
        stats.currentSubscribes = 0;
        stats.totalUnsubscribes = 0;
        this.http.put("api/Statistic", stats)
        .subscribe(response => {
        })
    }

    // Checks if terms and conditions is accepted
    acceptTerms(event) {
        if(event.target.checked) {
        this.termsAccepted = true;
        } else {
        this.termsAccepted = false;
        }
    }

    // Shows validation message for firt name input
    showFirstnameValidation() {
        this.firstnameVal = true;
    }

    // Shows validation message for last name input
    showLastnameValidation() {
        this.lastnameVal = true;
    }

    // Shows validation message for email input
    showEmailValidation() {
        this.emailVal = true;
    }
}

@Component({
    selector: 'app-home',
    templateUrl: './signUp.component.html',
    styleUrls: ['./home.component.css' ],
})

export class SignUpComponent {
    termsAccepted: boolean;
    public emailInputForm: FormGroup;
    showInfo: boolean;
    showRegister: boolean;
    public email: string;
    public sendUpdates: boolean;
    firstnameVal: boolean;
    lastnameVal: boolean;
    emailVal: boolean;
    emailRegex = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    constructor(private http: HttpClient, private fb: FormBuilder, private titleService: Title, private router: Router) {
        this.emailInputForm = fb.group(this.formValidation);
        this.setTitle("KnowOne - English");
    }

    ngOnInit() {
        this.http.get("https://api.linkpreview.net/?key=34f6aff3e2176d95d40996ff3ec938e3&q=https://knowone.no/home").subscribe(response => {
        console.log(response);
        },
        error => console.log(error)
        );
    }

    formValidation = {
        formFirstname: [
        '', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(20)])
        ],
        formLastname: [
        '', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(30)])
        ],
        formEmail: [
        '', Validators.compose([Validators.required, Validators.pattern(this.emailRegex)])
        ]
    }

    //Event listener to the checkbox for subscribing to mailing list
    wantUpdates(event) {
        this.sendUpdates = event.target.checked;
    }

    //Set html Title
    public setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle);
    }

    //Adds email to database
    addEmailToDb() {
        const mailAddress = new MailAddress();
        mailAddress.firstname = this.emailInputForm.controls.formFirstname.value;
        mailAddress.lastname = this.emailInputForm.controls.formLastname.value;
        mailAddress.address = this.emailInputForm.controls.formEmail.value;
        if (this.sendUpdates) {
        mailAddress.sendUpdates = true;
        }
        else {
        mailAddress.sendUpdates = false;
        }

        this.http.post("api/MailAddress/Save", mailAddress)
        .subscribe(retur => {
            window.alert("Registration completed");
            this.sendConfirmationEnglish(mailAddress);
            this.emailInputForm.reset();
            if (this.sendUpdates) {
            this.updateDBStatistics();
            }
            this.router.navigate(['/signedUp/en'])
        },
            error => console.log(error)
        );
    }

    sendConfirmationEnglish(mailAddress: MailAddress) {
        this.http.post("api/MailAddress/ConfirmationMailEnglish", mailAddress)
        .subscribe(respons => {
            console.log(respons);
        });
    }

    updateDBStatistics() {
        var stats = new Statistic();
        stats.lastSignUp = new Date();
        stats.totalSubscribes = 1;
        stats.currentSubscribes = 0;
        stats.totalUnsubscribes = 0;
        this.http.put("api/Statistic", stats)
        .subscribe(response => {
        })
    }

    // Checks if terms and conditions is accepted
    acceptTerms(event) {
        if(event.target.checked) {
        this.termsAccepted = true;
        } else {
        this.termsAccepted = false;
        }
    }

    // Shows validation message for firt name input
    showFirstnameValidation() {
        this.firstnameVal = true;
    }

    // Shows validation message for last name input
    showLastnameValidation() {
        this.lastnameVal = true;
    }

    // Shows validation message for email input
    showEmailValidation() {
        this.emailVal = true;
    }
}