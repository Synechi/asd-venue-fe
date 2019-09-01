import { Component, OnInit, NgModule, NgZone } from "@angular/core";
import { GoogleMapsService } from "../../service/google-maps.service";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"]
})
export class MapComponent implements OnInit {
  constructor(
    private gMapsService: GoogleMapsService,
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
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            name: place.name,
            address: place.vicinity,
            label: labelType,
            icon: {
              url: place.icon,
              scaledSize: {
                height: 20,
                width: 20
              }
            }
          });
          error => console.log(error);
        }
      });
    });
  }

  getDetail(placeID: string, map: any) {
    this.gMapsService.getDetails(placeID, map).subscribe(result => {
      this.__zone.run(() => {
        console.log(result);
      });
    });
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
  label: string;
  icon: {
    url: string;
    scaledSize: {
      height: number;
      width: number;
    };
  };
}
