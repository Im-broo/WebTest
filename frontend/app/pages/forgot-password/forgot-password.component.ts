import { Component, OnInit } from '@angular/core';
import { AuthService } from "@/shared/services/auth.service";

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.sass']
})
export class ForgotPasswordComponent implements OnInit {

    constructor(public authService: AuthService) { }

    user = {
        email: ''
    }
    processing = false

    resetPassword(event: Event, status: any) {
        event.preventDefault();
        if (status) return;
        this.processing = true
        this.authService.ForgotPassword(this.user.email).then(() => this.processing = false);
    }

    ngOnInit(): void {
    }

}
