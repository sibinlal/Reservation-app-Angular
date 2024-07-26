import { Injectable } from '@angular/core';
import { ReservationModel } from '../models/reservation-model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = "http://localhost:3001";
  private reservations: ReservationModel[] = [];

// We are removing local storage and using mock-api

 /*  
  constructor() { 
    let savedReservations = localStorage.getItem("reservations");
    this.reservations = savedReservations ? JSON.parse(savedReservations) :  [];
  } */

    constructor(private http: HttpClient) {

    }
/** 
  getAllReservations(): ReservationModel[] {
    return this.reservations;
  }
    */

  getAllReservations(): Observable<ReservationModel[]> {
    return this.http.get<ReservationModel[]>(this.apiUrl + "/reservations");
  }

  getReservation(id: string): Observable<ReservationModel>{
    return this.http.get<ReservationModel>(this.apiUrl + "/reservation/" + id);
    //return this.reservations.find(res => res.id === id);
  }  

  addReservation(reservation: ReservationModel): void { 
    if(reservation) {
      let newId = Date.now() + Math.floor(Math.random() * 1000);
      reservation.id = newId.toString();
      this.reservations.push(reservation);
     localStorage.setItem("reservations", JSON.stringify(this.reservations));
    }
  }

  deleteReservation(id: String): void {
    let index = this.reservations.findIndex(res => res.id === id);
    if(index != null && index != undefined){
      this.reservations.splice(index, 1);
      localStorage.setItem("reservations", JSON.stringify(this.reservations));
    }
  }

  updateReservation(id: string, updatedReservation: ReservationModel): void {
    let index = this.reservations.findIndex(res => res.id === id);
    if(index != null && index != undefined){
      this.reservations[index] = updatedReservation;
      localStorage.setItem("reservations", JSON.stringify(this.reservations));
    }
  }

}
