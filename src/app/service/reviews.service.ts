import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root"
})
export class ReviewsService {
  uri = "https://asd-venue-be.herokuapp.com/reviews";

  constructor(private http: HttpClient, private router: Router) { }

  getFriendReviews(id, placeID) {
    return this.http.get(`${this.uri}/getfriendreviews/${id}/${placeID}`);
  }

}
