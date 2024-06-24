import { Injectable } from '@angular/core';
import { ReservationModel } from '../models/reservation-model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservations: ReservationModel[] = [];

  constructor() { 
    let savedReservations = localStorage.getItem("reservations");
    this.reservations = savedReservations ? JSON.parse(savedReservations) :  [];
  }

  getAllReservations(): ReservationModel[] {
    return this.reservations;
  }

  getReservation(id: string): ReservationModel | undefined {
    return this.reservations.find(res => res.id === id);
  }  

  addReservation(reservation: ReservationModel): void { 
    if(reservation) {
      this.reservations.push(reservation);
      localStorage.setItem("reservations", JSON.stringify(this.reservations));
    }
  }

  deleteReservation(id: String): void {
    let index = this.reservations.findIndex(res => res.id === id);
    if(index){
      this.reservations.splice(index, 1);
      localStorage.setItem("reservations", JSON.stringify(this.reservations));
    }
  }

  updateReservation(updatedReservation: ReservationModel): void {
    let index = this.reservations.findIndex(res => res.id === updatedReservation.id);
    if(index){
      this.reservations[index] = updatedReservation;
      localStorage.setItem("reservations", JSON.stringify(this.reservations));
    }
  }

}
