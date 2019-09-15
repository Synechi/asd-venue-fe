import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class VenuelistService {

  uri = "https://asd-venue-be.herokuapp.com";

  constructor(private http: HttpClient) { }

  getVenueLists() {
    return this.http.get(`${this.uri}/venue_list`);
  }

  getVenueListbyID(id) {
    return this.http.get(`${this.uri}/venue_list/${id}`);
  }
}

