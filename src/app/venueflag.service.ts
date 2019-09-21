import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable
({
  providedIn: 'root'
})

export class VenueflagService 
{
  //Need To Call The Backend From Here In A Method. Example: user.service

  uri = "https://asd-venue-be.herokuapp.com";

  constructor(private http: HttpClient) {}

  addVenueFlag(venueName, venueFlag)
  {
    var venueObject = {venueName : venueName, venueFlag : venueFlag}; 
    return this.http.post(`${this.uri}/venueFlag/venueFlag`, venueObject); 
  }
}
