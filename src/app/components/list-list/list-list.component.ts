import { Component, OnInit, NgModule, NgZone } from "@angular/core";
import { GoogleMapsService } from "../../service/google-maps.service";

declare var google: any;


@Component({
  selector: 'app-list-list',
  templateUrl: './list-list.component.html',
  styleUrls: ['./list-list.component.css']
})
export class ListListComponent implements OnInit {
Venue_list: [];

  venues = [
    new Venue("ChIJDTR29iauEmsR97nGzWimbMo","" , ""),
    new Venue("ChIJISFoEiKuEmsR8TMqpG8xgwQ", "", ""),
    new Venue("ChIJC78QMReuEmsR47yBEa6iDPQ", "", ""),
    new Venue("ChIJ65p_3jyuEmsRuwkbKixObtM", "", ""),
  ];
  constructor(
    private gMapsService: GoogleMapsService,
    private __zone: NgZone
  ) { }

  ngOnInit() {
    }

  getDetail(placeID: string, map: any) {
    this.gMapsService.getDetails(placeID, map).subscribe(result => {
      this.__zone.run(() => {
        console.log(result);
      });
    });
  }

}
export class Venue {
  constructor(
      public id: string,
      public name: string,
      public address: string
      ) { }
  }
