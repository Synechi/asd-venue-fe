import { Component, OnInit, NgModule } from "@angular/core";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"]
})
export class MapComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  latitude = -33.870752;
  longitude = 151.208221;

  onChosenLocation(event) {
    console.log(event);
  }

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
          visibility: "on"
        }
      ]
    }
  ];
}
