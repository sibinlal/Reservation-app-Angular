import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ReservationModel } from '../models/reservation-model';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent implements OnInit {

  reservationForm: FormGroup = new FormGroup({});
  statusMsg: string = "test msg";

  constructor(private formBuilder: FormBuilder, private reservationService: ReservationService,
    private router: Router, private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    console.log('ReservationFormComponent loaded');
    this.reservationForm = this.createReservationForm();

    let editId = this.activatedRoute.snapshot.paramMap.get('id');
    if (editId) {
      this.loadReservationFormForEdit(editId);
    }
  }

  loadReservationFormForEdit(id: string) {
    let reservation = this.reservationService.getReservation(id);
    if (reservation) {
      this.reservationForm.patchValue(reservation);
    }
  }

  createReservationForm() {
    return this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      //guestEmail: ['', [Validators.required, Validators.email]],
      guestEmail: ['', [Validators.required]],
      roomNumber: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      let reservation: ReservationModel = this.reservationForm.value;
      let editId = this.activatedRoute.snapshot.paramMap.get('id');
      if (editId) { // update
        this.reservationService.updateReservation(editId, reservation);
      } else { // create
        this.reservationService.addReservation(reservation);
      }
      this.router.navigate(['/list']);
    }
  }

}
