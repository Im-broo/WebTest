import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from "@/shared/services/auth.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.sass']
})
export class HeaderComponent {
    login: any
    constructor(
        public afAuth: AngularFireAuth,
        public authService: AuthService
    ) {
        this.afAuth.onAuthStateChanged((user: any) => {
            if (!user) return;
            this.login = user.displayName
        })

    }
}
