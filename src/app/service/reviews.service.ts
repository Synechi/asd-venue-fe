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

  postReviewForm(review: Reviews): Observable<any> {
  //   var status:any
    
  //   status = {
  //     "Status" : "Review has not been created"
  // };
  // console.log("hello")
  // return status;

    return this.http.post('http://localhost:4000/user/addReview', review);
    // return this.http.post(`${this.uri}/user`, user);
  }



}
