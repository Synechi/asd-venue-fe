import { Component, OnInit, NgModule, NgZone } from "@angular/core";
import { GoogleMapsService } from "../../service/google-maps.service";
import { UserService } from "../../service/user.service";
import { WeekDay } from "@angular/common";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"]
})
export class MapComponent implements OnInit {
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

  getPlaces(map: any) {
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
    this.userService
      .getListsByID("5d628a72d2c6643f8095cefe")
      .subscribe(result => {
        var stringObj = JSON.stringify(result);
        var list = JSON.parse(stringObj);
        for (var key in list.venuelists) {
          var listName = list.venuelists[key].name;
          // var colour = list.venuelists[key].colour;
          // var day = this.getDay();

          for (var test in list.venuelists[key].venues) {
            console.log(list.venuelists[key].venues[test].placeID);
            var listName = list.venuelists[key].name;
            this.gMapsService
              .getDetails(list.venuelists[key].venues[test].placeID, map)
              .subscribe(details => {
                this.markers.push({
                  lat: details.geometry.location.lat(),
                  lng: details.geometry.location.lng(),
                  name: details.name,
                  address: details.formatted_address,
                  icon: {
                    url: details.icon,
                    scaledSize: {
                      height: 20,
                      width: 20
                    }
                  },
                  placeID: details.place_id,
                  list: listName,
                  iconColour: list.venuelists[key].colour,
                  website: details.website,
                  opening_hours:
                    details.opening_hours.weekday_text[this.getDay()]
                });
              });
          }
        }
      });
    console.log(this.markers);
  }

  getDay() {
    var day;
    switch (WeekDay[0]) {
      case "Monday":
        day = 0;
        break;
      case "Tuesday":
        day = 1;
        break;
      case "Wednesday":
        day = 2;
        break;
      case "Thursday":
        day = 3;
        break;
      case "Friday":
        day = 4;
        break;
      case "Saturday":
        day = 5;
        break;
      case "Sunday":
        day = 6;
        break;
    }
    return day;
  }

  // Style settings for map
  styles = [
    {
      featureType: "poi",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "poi.business",
      elementType: "labels",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "poi.park",
      stylers: [
        {
          visibility: "on"
        }
      ]
    },
    {
      featureType: "transit.station",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "poi.business",
      elementType: "labels",
      stylers: [
        {
          visibility: "off"
        }
      ]
    }
  ];
}

interface marker {
  lat: number;
  lng: number;
  name: string;
  address: string;
  icon: {
    url: string;
    scaledSize: {
      height: number;
      width: number;
    };
  };
  placeID: string;
  list: string;
  iconColour: string;
  website: String;
  opening_hours: String;
}
