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
    markers: marker[] = [];


      // Map Center
  latitude = -33.870752;
  longitude = 151.208221;
  // Marker Loader
  loadMarkers($event) {
    this.getPlaces($event);
  }



  showRev = false;
  selectedOption: string = ' '; 
  //Event Handler For The Select Element's Change Event
  selectChangeHandler (event : any)
  {
    //Update The UI 
    this.selectedOption = event.target.value;

    if (this.selectedOption == 'Visited') {
      this.showRev = true;
    } else {
      this.showRev = false;
    }
  }





    getPlaces(map: any) {
      this.gMapsService.getBarRest(map).subscribe(result => {
        this.__zone.run(() => {
          console.log(result);
  
          for (var place of result) {
            var labelType = "";
            for (let i = 0; i < 3; i++) {
              if (place.types[i] === "bar") {
                labelType = "Bar";
              }
              if (place.types[i] === "restaurant") {
                labelType = "Restaurant";
              }
            }
            this.markers.push({
              name: place.name,
              address: place.vicinity,
              label: labelType,
              
            });
            error => console.log(error);
          }
        });
      });
    }

    arraysort_name()
    {
      this.markers.sort((a, b) => (a.name > b.name) ? 1 : -1);
    }
    arraysort_location()
    {
      this.markers.sort((a, b) => (a.address > b.address) ? 1 : -1);
    }
    arraysort_genre()
    {
      this.markers.sort((a, b) => (a.label > b.label) ? 1 : -1);
    }
  
    getDetail(placeID: string, map: any) {
      this.gMapsService.getDetails(placeID, map).subscribe(result => {
        this.__zone.run(() => {
          console.log(result);
        });
      });
    });
  }

}


//export class Venue {
  //constructor(
    //  public id: string,
      //public name: string,
      //public address: string,
      //public genre: string
      //) { }
  //}
  //test

