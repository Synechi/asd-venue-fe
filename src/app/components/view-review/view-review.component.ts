import { Component, OnInit } from '@angular/core';
import { GoogleMapsService } from "../../service/google-maps.service";
import { MapsAPILoader } from '@agm/core';
import { ReviewsService } from "../../service/reviews.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-view-review',
  templateUrl: './view-review.component.html',
  styleUrls: ['./view-review.component.css']
})
export class ViewReviewComponent implements OnInit {

  constructor(private gMapsService: GoogleMapsService,
    private reviewsService: ReviewsService, public route: ActivatedRoute, private router: Router) { }

  venueName;

  reviews = [];

  ngOnInit() {
    this.gMapsService.getDetails(this.route.snapshot.paramMap.get("id"), document.createElement("div")).subscribe(res => {
      console.log(res);
      this.venueName = res.name
    })
    this.reviewsService.getFriendReviews(localStorage.getItem("id"), this.route.snapshot.paramMap.get("id")).subscribe(res => {
      console.log(res);

      this.reviews.push(res[0]);
      if (this.reviews.length == 0) {
        this.reviews.push({
          firstname: "",
          reviewDescription: "No Reviews Found!"
        })
      }

    })
  }

  updateScore(score, friendid, reviewid) {
    this.reviewsService.updateUserRating(localStorage.getItem("id"), friendid, reviewid, score).subscribe(res => {
      console.log(res);

      setTimeout(() => {
        this.router.navigate(['/map'])
      }, 500);
    })
  }

  loadReviews() {

  }




}
