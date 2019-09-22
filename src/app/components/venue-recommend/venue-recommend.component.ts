import { Component, OnInit, NgModule, NgZone } from "@angular/core";
import { GoogleMapsService } from "../../service/google-maps.service";
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
  markers: marker[] = [];

  // Map Center
  latitude = -33.870752;
  longitude = 151.208221;
  // Marker Loader
  loadMarkers($event) {
    this.getPlaces($event);
  }
  
  // Loads Markers once map is loaded
  getPlaces(map: any) {
    //Used to generate test data
    this.gMapsService.getBarRest(map).subscribe(result => {
      this.__zone.run(() => {
        for (var place of result) {
          // this.markers.push({
          //   lat: place.geometry.location.lat(),
          //   lng: place.geometry.location.lng(),
          //   name: place.name,
          //   address: place.vicinity,
          //   label: labelType,
          //   icon: {
          //     url: place.icon,
          //     scaledSize: {
          //       height: 20,
          //       width: 20
          //     }
          //   },
          //   rating: place.rating,
          //   open: openHour,
          //   placeID: place.placeID
          // });
          error => console.log(error);
        }
      });
    });
    //Pulls venues from current users venue lists
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
                    this.markers.push({
                      lat: details.geometry.location.lat(),
                      lng: details.geometry.location.lng(),
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
    }
  }
    export class marker {
      lat: number;
      lng: number;
      name: string;
      list: string;
      address: string;
      label: string;
    }
