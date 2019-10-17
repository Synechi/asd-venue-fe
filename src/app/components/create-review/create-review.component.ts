import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/user';
import { FormControl, FormGroupDirective, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from 'src/app/service/user.service';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Reviews } from 'src/app/reviews';
import { ReviewsService } from 'src/app/service/reviews.service';

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.css']
})
export class CreateReviewComponent implements OnInit {

  successMessage: string ="";
  postStatus = false;
  postStatusMessage ='';

  venueName: string;

  review: Reviews = {
    _id: null,
    _userid: null,
    venueName: null,
    reviewDescription: null,
    rating: null, 
    thumbsUpDown: null
  }



  constructor(private route: ActivatedRoute, private reviewsService: ReviewsService, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.venueName = params['venueName'];
      this.review.venueName = params['venueName'];
    })
  }
// Process the review
  onSubmitReview(form:NgForm) {
    // console.log(this.review.thumbsUpDown);
    //Gets the user ID from the local storage
    this.review._userid= localStorage.getItem('id');
    
    //Post the review to the Service 
    this.reviewsService.postReviewForm(this.review).subscribe(
      result => this.onHttpStatus(result),
      error => this.onHttpError(error)
    );
  }

  //If error occurs from the post
  onHttpError(errorResponse: any) {
    console.log('error: ', errorResponse);
   this.postStatus = true;
   this.postStatusMessage = "Internal Error";
  }

    //Response from the post
  onHttpStatus(statusResponse: any) {
    console.log('status: ', statusResponse);
   this.postStatus = true;
   var help = JSON.parse(JSON.stringify(statusResponse))
   if (help.Status == "Review has been created") {
    this.router.navigate(['/map'])
    }
    else {
      this.postStatus = true;
      this.postStatusMessage = help.Status;

    }
  }

}