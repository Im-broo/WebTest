import { Component, OnInit } from '@angular/core';
import { AuthService } from "@/shared/services/auth.service";

@Component({
    selector: 'app-verify-email',
    templateUrl: './verify-email.component.html',
    styleUrls: ['./verify-email.component.sass']
})
export class VerifyEmailComponent implements OnInit {

    constructor(public authService: AuthService) { }

    resendEmail() {
        this.authService.SendVerificationMail()
    }

    ngOnInit(): void {
    }

}
