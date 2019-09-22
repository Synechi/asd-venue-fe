import { Component, OnInit, NgModule, NgZone, ElementRef, ViewChild, Input, Output, EventEmitter, AfterViewInit } from "@angular/core";
import { GoogleMapsService } from "../../service/google-maps.service";
import { MapsAPILoader } from '@agm/core';
import { UserService } from "../../service/user.service";
import { FormsModule, ReactiveFormsModule, FormControl } from "@angular/forms"

declare var google: any;




@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"]
})
export class MapComponent implements OnInit {

  // Map Center
  latitude = -33.870752;
  longitude = 151.208221;

  // @ViewChild('search') 
  searchElementRef: ElementRef;
  searchControl: FormControl;
  autocompleteInput: string;
  queryWait: boolean;

  @Input() adressType: string;
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @ViewChild('addresstext', { static: true }) addresstext: any;

  constructor(
    private gMapsService: GoogleMapsService,
    private userService: UserService,
    private __zone: NgZone,
    private _mapsAPILoader: MapsAPILoader
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }

  private getPlaceAutocomplete() {
    var ne = new google.maps.LatLng(-33.853487, 151.218456);
    var sw = new google.maps.LatLng(-33.884559, 151.194724);
    var bound = new google.maps.LatLngBounds(sw, ne);
    const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement, {
      componentResctrictions: { country: 'au' },
      types: ['establishment'],
      bounds: bound
    })
    google.maps.event.addListener(autocomplete, "place_changed", () => {
      const place = autocomplete.getPlace();
      console.log(place);
    })
  }
  markers: marker[] = [];


  // Marker Loader
  loadMarkers($event) {
    this.getPlaceAutocomplete();
    this.getPlaces($event);
  }
  // Loads Markers once map is loaded
  getPlaces(map: any) {
    //Used to generate test data
    // this.gMapsService.getBarRest(map).subscribe(result => {
    //   this.__zone.run(() => {
    //     for (var place of result) {
    //       // this.markers.push({
    //       //   lat: place.geometry.location.lat(),
    //       //   lng: place.geometry.location.lng(),
    //       //   name: place.name,
    //       //   address: place.vicinity,
    //       //   label: labelType,
    //       //   icon: {
    //       //     url: place.icon,
    //       //     scaledSize: {
    //       //       height: 20,
    //       //       width: 20
    //       //     }
    //       //   },
    //       //   rating: place.rating,
    //       //   open: openHour,
    //       //   placeID: place.placeID
    //       // });
    //       error => console.log(error);
    //     }
    //   });
    // });
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
            this.getVenue(list, key, map);
          }
          console.log(this.markers);

        });
      });
  }

  getVenue(list: any, key: any, map: any) {
    for (var test in list.venuelists[key].venues) {
      // Search the google maps Place API with the Place ID and returns an obserable object with the details of that place.
      this.gMapsService
        .getDetails(list.venuelists[key].venues[test].placeID, map)
        .subscribe(details => {
          this.__zone.run(() => {
            var markerIcon;
            if (details.icon === "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png") {
              markerIcon = "../../../assets/img/markerIcons/food/" + list.venuelists[key].colour + ".png"
            } else if (details.icon === "https://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png") {
              markerIcon = "../../../assets/img/markerIcons/bars/" + list.venuelists[key].colour + ".png"
            } else {
              markerIcon = details.icon;
            }
            this.markers.push({
              lat: details.geometry.location.lat(),
              lng: details.geometry.location.lng(),
              name: details.name,
              address: details.formatted_address,
              icon: {
                url: markerIcon,
                scaledSize: {
                  height: 25,
                  width: 25
                }
              },
              placeID: details.place_id,
              list: list.venuelists[key].name,
              iconColour: list.venuelists[key].colour,
              website: details.website,
              opening_hours:
                details.opening_hours.weekday_text
            });
          });
        });
    }
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

// Interface for the markers shown on the map.

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
