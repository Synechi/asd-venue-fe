import { Component, OnInit, NgModule, NgZone } from "@angular/core";
import { GoogleMapsService } from "../../service/google-maps.service";
import { MarkerManager } from "@agm/core";
import { UserService } from "../../service/user.service";

@Component({
  selector: 'app-venue-recommend',
  templateUrl: './venue-recommend.component.html',
  styleUrls: ['./venue-recommend.component.css']
})
export class VenueRecommendComponent implements OnInit {

  constructor(
    private gMapsService: GoogleMapsService,
    private userService: UserService,
    private __zone: NgZone
  ) {}

  ngOnInit() {}
  // marker array that stores all of the base venue details to be shown on
  markers: marker[] = [];
  markers2: marker2[] = [];

  // Map Center
  latitude = -33.870752;
  longitude = 151.208221;
  // Marker Loader
  loadMarkers($event) {
    this.getPlaces($event);
  }

  getPlaces(map: any)
  {
    //Gets user recommendations from the location and list of users.
    //========================================================================//
    this.userService
    .getListsByID(localStorage.getItem("id"))
    .subscribe(result => {
      this.__zone.run(() => {
        // Stringify and then parses the observable object to access the child data.
        var stringObj = JSON.stringify(result);
        var list = JSON.parse(stringObj);
        // Loops over the users venues lists so that the it can access each lists stored venues.
        for (var key in list.venuelists) {
          // Loops over the lists venues to generate each marker on the map.
          for (var test in list.venuelists[key].venues) {
            // Search the google maps Place API with the Place ID and returns an obserable object with the details of that place.
            this.gMapsService
              .getDetails(list.venuelists[key].venues[test].placeID, map)
              .subscribe(details => {
                this.__zone.run(() => {
                  this.markers2.push({
                    name: details.name,
                    address: details.formatted_address,
                    list: list.venuelists[key].name,
                    label: null,
                  });
                });
              });
          }
        }
      });
    });
    //========================================================================//
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
        if (place.rating > 4){
          //if(place.){
        this.markers.push({
          name: place.name,
          address: place.vicinity,
          label: labelType,
          rating: place.rating
        });
     // }
      }
        error => console.log(error);
      }
    });
  });
}

}

//Adds a class for the marker structure that allows 
//for the marker array to exist.
    export class marker {
      name: string;
      address: string;
      label: string;
      rating: Int16Array;
    }   
     export class marker2 {
      name: string;
      address: string;
      label: string;
      list: string;
    }
