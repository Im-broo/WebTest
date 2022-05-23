import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-ticket',
    templateUrl: './ticket.component.html',
    styleUrls: ['./ticket.component.sass']
})
export class TicketComponent {
    addMode: boolean = false
    ticketForm = {
        title: '',
        description: ''
    }
    ticketsRef: any
    tickets: any
    processing: boolean = false
    constructor(
        public afs: AngularFirestore,
        private toastr: ToastrService
    ) {
        this.ticketsRef = afs.collection('tickets');
        this.tickets = this.ticketsRef.valueChanges({idField: 'id'});
    }
    addTicket() {
        this.processing = true;
        this.ticketsRef.add(this.ticketForm).then(() => {
            this.processing = false;
            this.toastr.success('Тикет успешно добавлен');
            this.addMode = false;
        }).catch((error: any) => this.toastr.error(error));
    }
    deleteTicket(id: string) {
        this.ticketsRef.doc(id).delete().then(() => {
            this.toastr.success('Тикет успешно удален');
        }).catch((error: any) => this.toastr.error(error));
    }
}
