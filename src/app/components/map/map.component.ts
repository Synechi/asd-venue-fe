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
    this.addMarker("ChIJDTR29iauEmsR97nGzWimbMo");
    this.addMarker("ChIJISFoEiKuEmsR8TMqpG8xgwQ");
    this.addMarker("ChIJC78QMReuEmsR47yBEa6iDPQ");
    this.addMarker("ChIJ65p_3jyuEmsRuwkbKixObtM");
    this.getDetail("ChIJC78QMReuEmsR47yBEa6iDPQ", $event);
  }

  addMarker(placeID) {
    this.gMapsService.getLatLng(placeID).subscribe(result => {
      this.__zone.run(
        () => {
          console.log(result);

          this.markers.push({
            lat: result.geometry.location.lat(),
            lng: result.geometry.location.lng(),
            address: result.formatted_address,
            label: result.types[0]
          });
        },
        error => console.log(error)
      );
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
  address: string;
  label: string;
}
