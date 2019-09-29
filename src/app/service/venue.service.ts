import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class VenueService {
  uri = "http://localhost:4000"; 
  // "https://asd-venue-be.herokuapp.com";

  constructor(private http: HttpClient) {}

  getVenue() {
    return this.http.get(`${this.uri}/venue`);
  }
}
