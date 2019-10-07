import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reviews } from 'src/app/reviews';
import { ReviewsService } from 'src/app/service/reviews.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.css']
})
export class CreateReviewComponent implements OnInit {

  venueName: string;

  reviews: Reviews = {
    _id: null,
    _userid: null,
    venueName: null,
    reviewDescription: null,
    rating: null, 
    thumbsUp: null,
    thumbsDown: null
  }

  constructor(private route: ActivatedRoute, private reviewsService: ReviewsService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.venueName = params['venueName'];
      this.reviews.venueName = params['venueName'];

      // this.id = params['id'];
      // console.log(this.id);
    })
  }

  onSubmitReview(form:NgForm) {
    console.log(this.reviews);
    // console.log('in onSubmitReview: ', form);

    // if (form.valid) {
    //   console.log("A review is created");

    // }
    // else {
    //   console.log("A review is not created");
    // }

  }

}