import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from "@/shared/services/auth.service";
import { Observable } from 'rxjs';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent {
    users: Observable<any[]>;
    currentUser: any;

    constructor(
        public afs: AngularFirestore,
        public afAuth: AngularFireAuth,
        public authService: AuthService
    ) {
        this.users = this.afs.collection('users').valueChanges()
        this.afAuth.onAuthStateChanged(() => this.currentUser = this.authService.authData)
    }
}
