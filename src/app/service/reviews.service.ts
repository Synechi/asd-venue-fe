import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../user';
import { Reviews } from '../reviews';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Injectable({
  providedIn: "root"
})
export class ReviewsService {
  uri = "https://asd-venue-be.herokuapp.com";

  constructor(private http: HttpClient, private router: Router) { }

  getFriendReviews(id, placeID) {
    return this.http.get(`${this.uri}/reviews/getfriendreviews/${id}/${placeID}`);
  }

  //Call the add review API call
  postReviewForm(review: Reviews): Observable<any> {
    // return this.http.post('http://localhost:4000/user/addReview', review);
    return this.http.post(`${this.uri}/reviews/addReview`, review);

  }

  updateUserRating(id, friendid, reviewid, score) {
    let doc = {
      _id: id,
      friendID: friendid,
      reviewID: reviewid,
      rating: score
    }
    console.log(doc);

    return this.http.get(`${this.uri}/venueReviews/updateScore/${id}/${friendid}/${reviewid}/${score}`)
  }



}
