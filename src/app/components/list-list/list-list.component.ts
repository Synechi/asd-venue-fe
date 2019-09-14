import { Component, OnInit, NgModule, NgZone } from "@angular/core";
import { GoogleMapsService } from "../../service/google-maps.service";
import { MarkerManager } from '@agm/core';

declare var google: any;


@Component({
  selector: 'app-list-list',
  templateUrl: './list-list.component.html',
  styleUrls: ['./list-list.component.css']
})
export class ListListComponent implements OnInit {
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
<<<<<<< HEAD

  getDetail(placeID: string, map: any) {
    this.gMapsService.getDetails(placeID, map).subscribe(result => {
      this.__zone.run(() => {
        console.log(result);
=======
    markers: marker[] = [];


      // Map Center
  latitude = -33.870752;
  longitude = 151.208221;
  // Marker Loader
  loadMarkers($event) {
    this.getPlaces($event);
    this.getPlaces($event);
  }

    getPlaces(map: any) {
      this.gMapsService.getBarRest(map).subscribe(result => {
        this.__zone.run(() => {
          console.log(result);
  
          for (var place of result) {
            var labelType = "";
            for (let i = 0; i < 3; i++) {
              if (place.types[i] === "bar") {
                labelType = "bar";
              }
              if (place.types[i] === "restaurant") {
                labelType = "restaurant";
              }
            }
            this.markers.push({
              name: place.name,
              address: place.vicinity,
              label: labelType,
              
            });
            error => console.log(error);
            this.arraysort();
          }
        });
      });
    }

    arraysort()
    {
      this.markers.every;
    }
  
    getDetail(placeID: string, map: any) {
      this.gMapsService.getDetails(placeID, map).subscribe(result => {
        this.__zone.run(() => {
          console.log(result);
        });
>>>>>>> MapList
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
