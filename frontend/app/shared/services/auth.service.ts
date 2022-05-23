import { Injectable, NgZone } from '@angular/core';
import { User } from '../services/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
    AngularFirestore,
    AngularFirestoreDocument
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    authData: any;
    constructor(
        public afs: AngularFirestore,
        public afAuth: AngularFireAuth,
        public router: Router,
        public ngZone: NgZone,
        private toastr: ToastrService
    ) {
        this.afAuth.authState.subscribe((user) => {
            if (user) {
                this.authData = user;
                localStorage.setItem('user', JSON.stringify(this.authData));
                JSON.parse(localStorage.getItem('user')!);
            } else {
                localStorage.setItem('user', 'null');
                JSON.parse(localStorage.getItem('user')!);
            }
        });
    }
    async SignIn(email: string, password: string) {
        return await this.afAuth
            .signInWithEmailAndPassword(email, password)
            .then((result) => {
                this.SetUserData(result.user);
                this.ngZone.run(() => {
                    if (result.user?.emailVerified) this.router.navigate(['dashboard']);
                    else this.router.navigate(['verify-email']);
                });
            })
            .catch((error) => {
                this.toastr.error(error.message);
            });
    }
    async SignUp(email: string, password: string) {
        return await this.afAuth
            .createUserWithEmailAndPassword(email, password)
            .then((result) => {
                this.SendVerificationMail();
                this.SetUserData(result.user);
            })
            .catch((error) => {
                this.toastr.error(error.message);
            });
    }
    SendVerificationMail() {
        return this.afAuth.currentUser
            .then((u: any) => {
                u.sendEmailVerification()
                this.toastr.success('Письмо отправлено на вашу электронную почту');
            })
            .then(() => {
                this.router.navigate(['verify-email']);
            });
    }
    async ForgotPassword(passwordResetEmail: string) {
        return await this.afAuth
            .sendPasswordResetEmail(passwordResetEmail)
            .then(() => {
                this.toastr.success('Письмо отправлено на вашу электронную почту');
            })
            .catch((error) => {
                this.toastr.error(error.message);
            });
    }
    get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user')!);
        return user != null;
    }
    get isVerified(): boolean {
        const user = JSON.parse(localStorage.getItem('user')!);
        return user !== null && user.emailVerified !== false;
    }
    GoogleAuth() {
        return this.AuthLogin(new auth.GoogleAuthProvider())
    }
    AuthLogin(provider: any) {
        return this.afAuth
            .signInWithPopup(provider)
            .then((result) => {
                this.SetUserData(result.user)
                this.ngZone.run(() => this.router.navigate(['dashboard']));
            })
            .catch((error) => {
                this.toastr.error(error.message);
            });
    }
    SetUserData(user: any) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(
            `users/${user.uid}`
        );
        const userData: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            birthDate: user.birthDate || null,
            cityId: user.cityId || null,
            emailVerified: user.emailVerified
        };

        this.updateLocalStorage(userData);

        if (this.isVerified) return;
        return userRef.set(userData, {
            merge: true,
        });
    }
    updateLocalStorage(user: any) {
        this.authData = user;
        localStorage.setItem('user', JSON.stringify(this.authData));
        JSON.parse(localStorage.getItem('user')!);
    }
    SignOut() {
        return this.afAuth.signOut().then(() => {
            localStorage.removeItem('user');
            this.router.navigate(['login']);
        });
    }
}
