import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.sass']
})
export class ProfileComponent {
    uid: any
    user: any
    userRef: any
    userForm = {
        email: '',
        firstName: '',
        lastName: '',
        birthDate: '',
        cityId: ''
    }
    citiesRef: any
    cities: any
    processing: boolean = false
    constructor(
        public afs: AngularFirestore,
        public afAuth: AngularFireAuth,
        private toastr: ToastrService
    ) {
        this.afAuth.onAuthStateChanged((user) => {
            if (!user) return
            this.uid = user?.uid
            this.getUserData()
        })

        this.citiesRef = afs.collection('cities');
        this.cities = this.citiesRef.valueChanges();
    }

    getUserData() {
        this.userRef = this.afs.doc(`users/${this.uid}`);
        this.user = this.userRef.valueChanges();
        this.user.subscribe((value: any) => {
            this.userForm.email = value.email
            this.userForm.firstName = value.firstName
            this.userForm.lastName = value.lastName
            this.userForm.birthDate = value.birthDate
            this.userForm.cityId = value.cityId || 0
        })
    }
    updateUserData() {
        this.processing = true;
        this.userRef.update(this.userForm).then(() => {
            this.processing = false;
            this.toastr.success('Данные успешно обновлены');
        }).catch((error: any) => this.toastr.error(error));
    }
}
