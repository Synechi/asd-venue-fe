import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

//Call The Backend From Here. Example: user.service

@Injectable({
  providedIn: "root"
})
export class VenueService {
  uri = "https://asd-venue-be.herokuapp.com";

  constructor(private http: HttpClient) {}

  getVenue() {
    return this.http.get(`${this.uri}/venue`);
  }
}
