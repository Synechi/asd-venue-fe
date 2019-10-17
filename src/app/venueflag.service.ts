import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable
  ({
    providedIn: 'root'
  })

export class VenueflagService {
  //This Method Makes A Call To The Backend

  uri = "https://asd-venue-be.herokuapp.com";
  // uri = "http://localhost:4000";

  constructor(private http: HttpClient) { }

  //Takes The VenueName, VenueFlag & User ID Parameters & Stores Then In The Venue Object Variable. This Venue Object Variable Is Then Pushed To The Backend.
  addVenueFlag(venueName, venueFlag, id: String) {
    const httpOptions =
    {
      headers: new HttpHeaders
        ({
          "Content-Type": "application/json"
        })

    };

    var venueObject = { venueName: venueName, venueFlag: venueFlag };
    return this.http.post(`${this.uri}/venueFlag/venueFlag/${id}`, venueObject, httpOptions);
  }
}
