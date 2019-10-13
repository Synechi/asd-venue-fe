import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable
({
  providedIn: 'root'
})

export class VenueflagService 
{
  //Need To Call The Backend From Here In A Method. Example: user.service

  //uri = "https://asd-venue-be.herokuapp.com";
  uri = "http://localhost:4000";

  constructor(private http: HttpClient) {}

  addVenueFlag(venueName, venueFlag, id: String)
  {
    const httpOptions = 
    {
      headers: new HttpHeaders
      ({
        "Content-Type": "application/json"
      })
    
    }; 

    var venueObject = {venueName : venueName, venueFlag : venueFlag}; 
    return this.http.post(`${this.uri}/venueFlag/venueFlag/${id}`, venueObject, httpOptions); 
  }
}
