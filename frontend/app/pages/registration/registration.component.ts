import { Component, OnInit } from '@angular/core';
import { AuthService } from "@/shared/services/auth.service";

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.sass']
})
export class RegistrationComponent implements OnInit {
    constructor(public authService: AuthService) { }

    user = {
        email: '',
        password: ''
    }
    processing = false

    registerUser(event: Event, status: any) {
        event.preventDefault();
        if (status) return;
        this.processing = true
        this.authService.SignUp(this.user.email, this.user.password).then(() => this.processing = false)
    }

    ngOnInit() { }
}
