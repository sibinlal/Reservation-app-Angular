import { Component, OnInit } from '@angular/core';
import { ReservationModel } from '../models/reservation-model';
import { ReservationService } from '../reservation/reservation.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css'
})
export class ReservationListComponent implements OnInit{

  reservations: ReservationModel[] = [];

  constructor(private reservationService: ReservationService) {

  }

  ngOnInit(): void {
    this.reservationService.getAllReservations().subscribe(reservation => {
      this.reservations = reservation;
    })
  }

  deleteReservation(id: string){
    this.reservationService.deleteReservation(id);
  }

 


}
