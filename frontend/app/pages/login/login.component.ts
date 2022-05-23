import { Component, OnInit } from '@angular/core';
import { AuthService } from "@/shared/services/auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
    constructor(public authService: AuthService) { }

    user = {
        email: '',
        password: ''
    };
    processing = false;

    authorizeUser(event: Event, status: any) {
        event.preventDefault();
        if (status) return;
        this.processing = true;
        this.authService.SignIn(this.user.email, this.user.password).then(() => this.processing = false);
    }

    ngOnInit() { }
}
