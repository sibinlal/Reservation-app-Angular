import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent implements OnInit {

  reservationForm: FormGroup  = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private reservationService: ReservationService) {
  }

  ngOnInit(): void {
    console.log('ReservationFormComponent loaded');
    this.reservationForm = this.createReservationForm();
  }

  createReservationForm() {
    return this.formBuilder.group({
      checkInDate : ['',Validators.required],
      checkOutDate : ['',Validators.required],
      guestName : ['',Validators.required],
      guestEmail : ['',[Validators.required, Validators.email]],  
      roomNumber : ['',Validators.required]
    });
  }

  onSubmit(){
    if(this.reservationForm.valid) {
        this.reservationService.addReservation(this.reservationForm.value);
    } 
  }

}
