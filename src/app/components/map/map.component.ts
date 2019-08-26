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
  loadMarkers() {
    this.addMarker("ChIJDTR29iauEmsR97nGzWimbMo");
    this.addMarker("ChIJISFoEiKuEmsR8TMqpG8xgwQ");
    this.addMarker("ChIJC78QMReuEmsR47yBEa6iDPQ");
  }

  addMarker(placeID) {
    this.gMapsService.getLatLng(placeID).subscribe(result => {
      this.__zone.run(
        () => {
          console.log(result);

          this.markers.push({
            lat: result.geometry.location.lat(),
            lng: result.geometry.location.lng(),
            adress: result.formatted_address
          });
        },
        error => console.log(error)
      );
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
  adress: string;
}
