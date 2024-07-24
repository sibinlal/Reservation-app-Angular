import { Injectable } from '@angular/core';
import { ReservationModel } from '../models/reservation-model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservations: ReservationModel[] = [];

// We are removing local storage and using mock-api

 /*  
  constructor() { 
    let savedReservations = localStorage.getItem("reservations");
    this.reservations = savedReservations ? JSON.parse(savedReservations) :  [];
  } */

  getAllReservations(): ReservationModel[] {
    return this.reservations;
  }

  getReservation(id: string): ReservationModel | undefined {
    return this.reservations.find(res => res.id === id);
  }  

  addReservation(reservation: ReservationModel): void { 
    if(reservation) {
      let newId = Date.now() + Math.floor(Math.random() * 1000);
      reservation.id = newId.toString();
      this.reservations.push(reservation);
     // localStorage.setItem("reservations", JSON.stringify(this.reservations));
    }
  }

  deleteReservation(id: String): void {
    let index = this.reservations.findIndex(res => res.id === id);
    if(index != null && index != undefined){
      this.reservations.splice(index, 1);
      //localStorage.setItem("reservations", JSON.stringify(this.reservations));
    }
  }

  updateReservation(id: string, updatedReservation: ReservationModel): void {
    let index = this.reservations.findIndex(res => res.id === id);
    if(index != null && index != undefined){
      this.reservations[index] = updatedReservation;
      //localStorage.setItem("reservations", JSON.stringify(this.reservations));
    }
  }

}
